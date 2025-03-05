# Training Institute Management System

A comprehensive web application for managing training institute operations, including student applications, interview scheduling, and selection processes.

## Features

- 🧑‍🎓 **Student Portal**
  - Apply for training programs
  - Track application status
  - Receive notifications at each stage

- 👨‍💼 **Admin Portal**
  - View and manage student applications
  - Assign interviewers for each round
  - Track interview progress

- 👨‍🏫 **Interviewer Portal**
  - View assigned interviews
  - Evaluate candidates
  - Provide feedback

- 📧 **Automated Notifications**
  - Email notifications for application status changes
  - Interview scheduling alerts
  - Selection results

## Tech Stack

- **Frontend**
  - React with TypeScript
  - Vite for fast development
  - Tailwind CSS for styling
  - React Router for navigation
  - React Hook Form for form handling
  - Zod for validation

- **Backend**
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Cloud Functions
  - SendGrid for email notifications

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase CLI
- SendGrid account (for email notifications)

### Project Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd training-institute-system
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file based on the provided `.env.example`:

```bash
cp .env.example .env
```

Update the variables with your Firebase project credentials.

4. **Firebase Setup**

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init
```

Select the following options:
- Firestore
- Functions
- Hosting
- Storage
- Use an existing project (select your Firebase project)

5. **Set up Firebase Functions**

```bash
cd functions
npm install
```

6. **Deploy Firebase Resources**

```bash
firebase deploy
```

7. **Run the development server**

```bash
npm run dev
```

The application should now be running on `http://localhost:5173`.

## Authentication and User Roles

The system uses Firebase Authentication with Google Sign-In. When users sign up for the first time, they are assigned the 'student' role by default. To change user roles:

1. Sign in to the Firebase console
2. Go to Firestore Database
3. Find the user in the 'users' collection
4. Modify the 'role' field to set admin or interviewer access:
   ```
   role: {
     student: true,
     admin: true,   // Add this for admin access
     interviewer: true  // Add this for interviewer access
   }
   ```

## Deployment

The application is configured to be deployed using Firebase Hosting:

```bash
npm run build
firebase deploy --only hosting
```

## Email Notifications

Email notifications are sent using SendGrid through Firebase Cloud Functions. To enable email notifications:

1. Create a SendGrid account
2. Get an API key
3. Add the API key to your Firebase Functions environment:

```bash
firebase functions:config:set sendgrid.apikey="YOUR_SENDGRID_API_KEY"
```

4. Deploy the functions again:

```bash
firebase deploy --only functions
```

## Project Structure

```
├── public/              # Public assets
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React contexts
│   ├── firebase/        # Firebase configuration
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   ├── router/          # Routing configuration
│   ├── services/        # Service layer for API calls
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── functions/           # Firebase Cloud Functions
├── .env.example         # Example environment variables
├── firebase.json        # Firebase configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # This file
```

## License

[MIT](LICENSE)