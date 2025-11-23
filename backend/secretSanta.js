import nodemailer from 'nodemailer';

/**
 * Assigns Secret Santa pairs ensuring no one gets themselves
 * @param {Array} participants - Array of {name, email} objects
 * @returns {Array} Array of assignments {giver, receiver}
 */
export function assignSecretSanta(participants) {
  const shuffled = [...participants];
  let attempts = 0;
  const maxAttempts = 100;

  // Shuffle until we get a valid assignment (no one gets themselves)
  while (attempts < maxAttempts) {
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Check if anyone got themselves
    let valid = true;
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].email === shuffled[i].email) {
        valid = false;
        break;
      }
    }

    if (valid) {
      // Create assignments
      const assignments = participants.map((giver, index) => ({
        giver: giver,
        receiver: shuffled[index]
      }));
      return assignments;
    }

    attempts++;
  }

  throw new Error('Could not generate valid Secret Santa assignments');
}

/**
 * Sends Secret Santa assignment emails to all participants
 * @param {Array} assignments - Array of {giver, receiver} pairs
 * @returns {Object} Results of email sending
 */
export async function sendSecretSantaEmails(assignments) {
  // Check if email is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('⚠️  Email not configured. Set EMAIL_USER and EMAIL_PASSWORD in .env file');
    console.log('\n📧 Secret Santa Assignments (Email not sent):');
    assignments.forEach(assignment => {
      console.log(`${assignment.giver.name} (${assignment.giver.email}) → ${assignment.receiver.name}`);
    });
    
    return {
      successful: 0,
      failed: assignments.length,
      message: 'Email not configured. Check console for assignments.'
    };
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let successful = 0;
  let failed = 0;

  // Send emails to each participant
  for (const assignment of assignments) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: assignment.giver.email,
        subject: '🎅 Your Secret Santa Assignment!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              }
              h1 {
                color: #c41e3a;
                text-align: center;
                font-size: 32px;
                margin-bottom: 20px;
              }
              .emoji {
                font-size: 48px;
                text-align: center;
                margin: 20px 0;
              }
              .message {
                font-size: 18px;
                line-height: 1.6;
                color: #333;
                text-align: center;
              }
              .recipient {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin: 30px 0;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
              }
              .footer {
                text-align: center;
                color: #666;
                font-size: 14px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #eee;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="emoji">🎅🎄🎁</div>
              <h1>Ho Ho Ho!</h1>
              <p class="message">
                Hi <strong>${assignment.giver.name}</strong>! 👋
              </p>
              <p class="message">
                You have been selected as a Secret Santa! 🎉
              </p>
              <p class="message">
                Your mission, should you choose to accept it, is to bring joy to:
              </p>
              <div class="recipient">
                ${assignment.receiver.name}
              </div>
              <p class="message">
                Remember, this is a secret! 🤫 Don't reveal your identity until the big day!
              </p>
              <div class="footer">
                <p>🎁 Happy gifting and spreading holiday cheer! 🎁</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      await transporter.sendMail(mailOptions);
      successful++;
      console.log(`✅ Email sent to ${assignment.giver.email}`);
    } catch (error) {
      failed++;
      console.error(`❌ Failed to send email to ${assignment.giver.email}:`, error.message);
    }
  }

  return { successful, failed };
}

