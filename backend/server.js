import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { assignSecretSanta, sendSecretSantaEmails } from './secretSanta.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Assign and send Secret Santa emails
app.post('/api/assign-secret-santa', async (req, res) => {
  try {
    const { participants } = req.body;

    if (!participants || !Array.isArray(participants) || participants.length < 3) {
      return res.status(400).json({ 
        error: 'At least 3 participants are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const participant of participants) {
      if (!participant.name || !participant.email) {
        return res.status(400).json({ 
          error: 'Each participant must have a name and email' 
        });
      }
      if (!emailRegex.test(participant.email)) {
        return res.status(400).json({ 
          error: `Invalid email format: ${participant.email}` 
        });
      }
    }

    // Assign Secret Santa pairs
    const assignments = assignSecretSanta(participants);

    // Send emails
    const emailResults = await sendSecretSantaEmails(assignments);

    res.json({ 
      success: true, 
      message: 'Secret Santa assignments sent successfully!',
      emailsSent: emailResults.successful,
      totalParticipants: participants.length
    });

  } catch (error) {
    console.error('Error assigning Secret Santa:', error);
    res.status(500).json({ 
      error: 'Failed to assign Secret Santa',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎅 Secret Santa server running on http://localhost:${PORT}`);
});

