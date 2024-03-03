# Task Manager Backend

Welcome to the Task Manager backend server! This server provides RESTful APIs for managing tasks and users, along with features like photo upload, authentication, and authorization.

## Features 

- User authentication (register, login) with JWT tokens and cookies
- Authorization middleware to protect routes
- CRUD operations for tasks (Create, Read, Update, Delete)
- CRUD operations for users
- Photo upload for user profile pictures

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JSON Web Tokens (JWT) for authentication
- bcrypt.js for password hashing
- multer for handling file uploads
- cookies-parser for parsing cookies

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or a remote MongoDB connection URI

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager-backend.git



API Endpoints
Authentication
POST /api/users/register: Register a new user.
Request Body: { "name": "User Name", "email": "user@example.com", "password": "password" }

POST /api/users/login: Login with existing credentials.
Request Body: { "email": "user@example.com", "password": "password" }

Tasks
POST /api/tasks: Create a new task (requires authentication).
Request Body: { "title": "Task Title", "description": "Task Description" }

GET /api/tasks: Get all tasks (requires authentication).

GET /api/tasks/:id: Get a specific task by ID (requires authentication).

PATCH /api/tasks/:id: Update a specific task by ID (requires authentication).

Request Body: { "title": "Updated Task Title", "description": "Updated Task Description", "completed": true }

DELETE /api/tasks/:id: Delete a specific task by ID (requires authentication).
Users

GET /api/users/me: Get user profile (requires authentication).
PATCH /api/users/me: Update user profile (requires authentication).
Request Body: { "name": "Updated Name", "email": "updated@example.com", "password": "newpassword" }

DELETE /api/users/me: Delete user account (requires authentication).
Photo Upload

POST /api/users/me/avatar: Upload a profile picture (requires authentication and multipart form data).
Request Body: { "avatar": [image file] }