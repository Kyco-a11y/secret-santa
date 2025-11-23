# 🎅 Secret Santa Application

A beautiful, animated web application to organize Secret Santa gift exchanges! This app collects participant emails, randomly assigns Secret Santa pairs, and sends personalized email notifications to each participant.

## ✨ Features

- 🎨 **Beautiful Animated UI** - Built with React, Framer Motion, and Tailwind CSS
- ❄️ **Snowfall Animation** - Festive snowflakes falling in the background
- 📧 **Automatic Email Notifications** - Sends personalized emails to each participant
- 🎲 **Smart Random Assignment** - Ensures no one gets themselves
- ✅ **Email Validation** - Validates all email addresses before processing
- 🔒 **Privacy Focused** - Assignments are kept secret and sent directly to participants

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Gmail account (for sending emails)

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd /Users/huonguyen/secret_santa
```

2. **Install all dependencies:**
```bash
npm run install:all
```

### Configuration

#### Gmail Setup for Email Sending

To send emails, you need to configure Gmail with an App Password:

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Create an App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Secret Santa App"
   - Copy the generated 16-character password

3. **Configure the Backend**

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your credentials:

```env
PORT=3001
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

⚠️ **Important:** Never commit the `.env` file to version control!

### Running the Application

From the root directory, run:

```bash
npm run dev
```

This will start:
- **Frontend** at http://localhost:3000
- **Backend** at http://localhost:3001

## 📖 How to Use

1. **Add Participants**
   - Enter each participant's name and email
   - Click "Add Participant"
   - Add at least 3 participants

2. **Assign Secret Santa**
   - Once you have 3+ participants, click "Assign Secret Santa & Send Emails"
   - The app will randomly assign pairs
   - Each participant will receive an email telling them who they're shopping for

3. **Email Example**
   - Participants receive a beautifully formatted HTML email
   - The email reveals who they should buy a gift for
   - Reminds them to keep it a secret! 🤫

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Nodemailer** - Email sending
- **dotenv** - Environment configuration

## 📁 Project Structure

```
secret_santa/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── Snowfall.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/               # Express backend
│   ├── server.js          # Express server
│   ├── secretSanta.js     # Assignment logic & email
│   ├── package.json
│   ├── .env.example       # Environment template
│   └── .env               # Your configuration (gitignored)
├── package.json           # Root package.json
└── README.md
```

## 🎯 API Endpoints

### `GET /api/health`
Health check endpoint

**Response:**
```json
{
  "status": "ok"
}
```

### `POST /api/assign-secret-santa`
Assigns Secret Santa pairs and sends emails

**Request Body:**
```json
{
  "participants": [
    { "name": "John Doe", "email": "john@example.com" },
    { "name": "Jane Smith", "email": "jane@example.com" },
    { "name": "Bob Johnson", "email": "bob@example.com" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Secret Santa assignments sent successfully!",
  "emailsSent": 3,
  "totalParticipants": 3
}
```

## 🔧 Development

### Run Frontend Only
```bash
npm run dev:frontend
```

### Run Backend Only
```bash
npm run dev:backend
```

### Build for Production
```bash
cd frontend
npm run build
```

## ⚠️ Testing Without Email

If you want to test the app without configuring email:
- The backend will still generate assignments
- Assignments will be logged to the console
- No actual emails will be sent

## 🎁 Tips for a Great Secret Santa

1. **Set a Budget** - Agree on a price range before starting
2. **Set a Deadline** - Make sure everyone knows when to exchange gifts
3. **Add Guidelines** - Consider sharing gift preferences or restrictions
4. **Plan a Party** - Schedule a gift exchange party for the big reveal!

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📝 License

MIT License - Feel free to use this for your Secret Santa events!

## 🎄 Happy Holidays!

Enjoy spreading holiday cheer with your Secret Santa exchange! 🎅🎁

---

Made with ❤️ and a sprinkle of holiday magic ✨

