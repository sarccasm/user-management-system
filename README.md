# User Management System

A full-stack application with Node.js/Express.js backend and vanilla JavaScript frontend, featuring user authentication and management.

## Features

- User registration and login
- JWT authentication
- Protected routes
- User list management
- MongoDB Cloud database
- Responsive design

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcryptjs for password hashing

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd user-management-system
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Configure environment variables
   Create a `.env` file in the backend directory with:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

4. Start the server

```bash
npm start
```

5. Open frontend

- Navigate to `frontend/index.html` in your browser
- Or use Live Server in VS Code

## API Endpoints

### Users

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users` - Get all users (Protected route)

## Project Structure

```
project/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── index.html
    ├── styles.css
    └── script.js
```

## Security Features

- Password hashing
- JWT authentication
- Protected routes
- Input validation
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

```

```
