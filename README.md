# Voting Application

#### 🔗 _[Voting Application API](https://voting-api-xhn6.onrender.com/)_

![Node.js](https://img.shields.io/badge/JS_Env-Node.js-5FA04E) ![Express.js](https://img.shields.io/badge/Framework-Express.js-blue) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-237a3b) ![Mongoose](https://img.shields.io/badge/ODM-MongoDB-237a3b) ![JWT](https://img.shields.io/badge/Authentication-JWT-red) ![Bcrypt](https://img.shields.io/badge/Password_Hashing-Bcrypt-orange)

This is a backend application for a voting system where users can vote for candidates. It provides functionalities for user authentication, candidate management, and voting.

## Features

- User sign up and login with Voter ID and password.
- User can view the list of candidates.
- User can vote for a candidate (only once).
- Admin can manage candidates (add, update, delete).
- Admin cannot vote.
- System can have only one admin.
- User can view live voting sorted by their vote count.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication and stateless token based authorization
- Bcrypt for password encryption/decryption

# API Endpoints

## Authentication

### Sign Up

- `POST /signup`: Sign up a user

### Login

- `POST /login`: Login a user

## Candidates

### Get Candidates

- `GET /candidates`: Get the list of candidates

### Add Candidate

- `POST /candidates`: Add a new candidate (Admin only)

### Update Candidate

- `PUT /candidates/:id`: Update a candidate by ID (Admin only)

### Delete Candidate

- `DELETE /candidates/:id`: Delete a candidate by ID (Admin only)

## Voting

### Get Vote Count

- `GET /candidates/vote/count`: Get the count of votes for each candidate

### Vote for Candidate

- `POST /candidates/vote/:id`: Vote for a candidate (User only)

## User Profile

### Get Profile

- `GET /users/profile`: Get user profile information

### Change Password

- `PUT /users/profile/password`: Change user password
