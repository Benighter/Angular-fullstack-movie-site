# FilmSphere

FilmSphere is a modern, feature-rich web application designed for movie enthusiasts to discover, explore, and manage their favorite films. This platform offers a seamless user experience with secure authentication and personalized features.

## Key Features

- **User Authentication**: Secure registration and login system
- **Personal Watchlist**: Create and manage your movie watchlist
- **Movie Discovery**: Browse through an extensive collection of films
- **Search Functionality**: Find movies by title, genre, or year
- **Movie Details**: Access comprehensive information about each film
- **User Profiles**: Customize your profile and preferences
- **Responsive Design**: Seamless experience across all devices

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (v13.0 or higher)
- [Git](https://git-scm.com/downloads) (for version control)

## Project Structure

The project is divided into two main directories:
```
FilmSphere/
├── client/          # Frontend React application
└── server/          # Backend Node.js/Express application
```

## Database Setup

1. Install PostgreSQL if you haven't already
2. Open pgAdmin or your preferred PostgreSQL client
3. Create a new database named 'login'
4. Execute the following SQL query to create the users table:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

## Environment Setup

1. In the server directory, create a `.env` file with the following configuration:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=login
DB_PASSWORD=your_password_here
DB_PORT=5432
```
Replace `your_password_here` with your actual PostgreSQL password.

## Installation

### Backend Setup (server/)

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install express pg axios cors bcrypt dotenv nodemon
```

### Frontend Setup (client/)

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

1. Navigate to the server directory:
```bash
cd server
```

2. Start the server:
```bash
npm start
```
The server will run on http://localhost:5000

### Start the Frontend Application

1. Navigate to the client directory:
```bash
cd client
```

2. Start the React development server:
```bash
npm start
```
The application will open in your default browser at http://localhost:3000

## API Endpoints

The following API endpoints are available:

- POST `/api/register` - Register a new user
- POST `/api/login` - User login
- GET `/api/user` - Get user information (protected route)

## Technologies Used

### Frontend
- React.js
- React Router
- Axios
- CSS Modules

### Backend
- Node.js
- Express.js
- PostgreSQL
- bcrypt (for password hashing)
- JSON Web Tokens (JWT)
- cors
- dotenv

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Input validation and sanitization
- CORS enabled
- Environment variables for sensitive data

## Troubleshooting

1. Database Connection Issues:
   - Verify PostgreSQL is running
   - Check database credentials in .env file
   - Ensure correct port configuration

2. Frontend Connection Issues:
   - Verify API endpoint URLs
   - Check CORS configuration
   - Ensure backend server is running

3. Installation Issues:
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json, then run `npm install` again

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

bennet.nkolele1998@gmail.com
Project Link: https://github.com/Benighter/Angular-fullstack-movie-site
