# Elden Ring Nightreign – Build Creator

## Overview
A full-stack web application inspired by *Elden Ring Nightreign* that allows users to create, share, and explore custom weapon builds.

Users can:
- Create builds with up to 6 weapons and a character
- Browse builds from other users
- Like builds
- Manage their profile
- Chat in global rooms

This project demonstrates a complete full-stack architecture with authentication, database integration, and real-time communication.

---

## Features

- Authentication (Register / Login with JWT)
- Build creation system (6 weapon slots + character)
- Browse & like builds
- User profiles (editable)
- WebSocket-based global chat
- Custom UI with game-inspired design
- External API integration (weapon data)

---

## 🏗 Tech Stack

### Frontend
- React
- CSS

### Backend
- Node.js
- Express.js
- MySQL
- WebSockets

### Other
- External Elden Ring API (weapon data)
- JWT Authentication

---

## 🧠 Architecture

/backend
├── controllers
├── models
├── routes
└── services

/frontend
├── public
├── src/components
├── src/services
└── src/styles

The app follows a classic MVC-inspired structure with clear separation between frontend, backend, and database logic.

---

## Screenshots

### Login
![Login](/frontend/public/images/Screenshots/LoginPage.jpg)

### Browse Builds
![Browse](/frontend/public/images/Screenshots/BrowsePage.jpg)

### Create Build
![Create](/frontend/public/images/Screenshots/CreateBuildPage.jpg)

### Chat
![Chat](/frontend/public/images/Screenshots/Chat.jpg)

### Profile
![Profile](/frontend/public/images/Screenshots/ProfilePage.jpg)

---

## Setup

### 1. Clone the repository
```bash
    git clone https://github.com/HiPaul13/Elden-Ring-Nightreign-Builder.git
    cd Elden-Ring-Nightreign-Builder
```

```bash
    cd backend
    npm install
    node app.js
```

```bash
    cd frontend
    npm install
    npm run dev
```


Add any environment variables or `.env` file setup notes if required - here's an example:

# Environment setup (if needed)
Create a file called .env in /backend and add the following:

DB_USERNAME = cc241055
DB_PASSWORD = Jb1+Fs0!Yt8!
ACCESS_TOKEN_SECRET=022304cac94aff7f605434eec3751c4b0a371f5e3855b8198485b6d0861a5facd75221963a4e2aa3a28bcd89e189d6995f1725aab64d8855f289ac810d2c966f

Test account: 
- Email: admin@nightreign.com 
- Password: admin

# Usage FLow

- Register or login
- Browse builds from other users
- Create your own build
- Save and share it
- Like builds from others
- Chat in global rooms
- Edit your profile

# What I Learned

- Full-stack development (React + Node.js + MySQL)
- Connecting frontend, backend, and database
- Working with external APIs
- Handling authentication with JWT
- Structuring scalable applications
- CSS debugging and component isolation

# Future Improvements
- Better responsive design
- More advanced filtering & sorting
- Private chat rooms
- improve overall usability
- Improved UI consistency

# License
This project is part of a university course and is intended for educational and portfolio purposes.

# Author
- Paul Hitzl
- Full-stack developer (in progress)