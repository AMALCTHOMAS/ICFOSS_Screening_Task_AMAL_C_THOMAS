# User Registration and Login System

## Objective

This documentation provides a comprehensive guide for setting up, executing, and hosting a user registration and login system developed using the MERN stack. The system includes robust data validation to ensure secure and accurate user data entry.

## Prerequisites

- **MongoDB**: Must be installed and running on your system. Refer to the following links for installation instructions:
  - [MongoDB Community Server download page](https://www.mongodb.com/try/download/community)
  - [MongoDB Shell download page](https://www.mongodb.com/try/download/shell)
- **Node.js**: Version 20 or higher is required. Refer to the [Node.js installation page](https://nodejs.org/en/download/) for the appropriate version.

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AMALCTHOMAS/ICFOSS_Screening_Task_AMAL_C_THOMAS.git
cd ICFOSS_Screening_Task_AMAL_C_THOMAS
```
### 2. Set Up MongoDB Database

### Access MongoDB Shell
Open your terminal and start the MongoDB shell by typing:

```bash
mongosh
```

#### Create the Database and User
In the MongoDB shell, run the following commands to create a database named auth and a user with the username authuser and password password:

```bash
// Switch to the 'auth' database (it will be created if it doesn't exist)
use auth

// Create a user with readWrite access
db.createUser({
  user: "authuser",
  pwd: "password",
  roles: [{ role: "readWrite", db: "auth" }]
})
```

### 3. Install Dependencies
  **Frontend**
  Navigate to the frontend directory and install dependencies:
  ```bash
cd frontend
npm install
  ```
**Backend**
Navigate to the backend directory and install dependencies:
```bash
cd ../backend
npm install
```
### 4. Configure Environment Variables
Make sure that the .env file in the backend directory has the same environment variables as below:
```bash
PORT = 3003
MONGODB_CONNECTION_STRING = "mongodb://authuser:password@localhost:27017/auth"
JWT_SECRET = "secret123"
```
### 5. Start the Backend Server
In the backend directory, start the server on port 3003:
```bash
cd backend
npm start
```
### 6. Start the Frontend Development Server
``` bash
cd frontend
npm run dev
```
# Execution Steps
# User Registration and Login

## Register a New User

1. Navigate to [http://localhost:5173/register](http://localhost:5173/register).
2. Fill in the registration form with valid data.
3. Submit the form to create a new user account.

## Login

1. Navigate to [http://localhost:5173/](http://localhost:5173/).
2. Enter your registered username and password.
3. Submit the form to log in.

# Technical Details

## Frontend
- **Framework:** React
- **Development Tool:** Vite
- **Port:** 5173

## Backend
- **Framework:** Express.js
- **Port:** 3003

## Database
- **Database:** MongoDB

# Security and Authentication
- **Password Encryption:** Passwords are encrypted using bcrypt.
- **Authentication:** Login and logout functionality is implemented using JWT (JSON Web Token).

# Architecture
- **Style:** REST

## REST (Representational State Transfer)
REST is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol -- the HTTP protocol. RESTful applications use HTTP requests to perform CRUD (Create, Read, Update, Delete) operations on resources, which are identified by URLs.

### Advantages of REST
- **Scalability:** RESTful systems can scale easily to handle a large number of clients and interactions.
- **Flexibility and Portability:** Since REST is based on standard HTTP protocols, it can be used across various platforms and languages.
- **Performance:** REST can be optimized for the web, making it efficient in terms of network performance.
- **Simplicity:** RESTful APIs are simple to design and use, making it easier for developers to implement and maintain.
- **Statelessness:** Each request from a client to the server must contain all the information the server needs to fulfill the request. This reduces the server load as it does not need to store session state information.
