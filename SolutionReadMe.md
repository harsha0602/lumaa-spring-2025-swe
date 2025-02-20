# Task Management Application

This repository contains a full-stack task management application built using React + TypeScript (frontend), Node.js (Express) + TypeScript (backend), and PostgreSQL (database).

## Table of Contents
- [Project Overview](#project-overview)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [How to Run the Backend](#how-to-run-the-backend)
- [How to Run the Frontend](#how-to-run-the-frontend)
- [Testing](#testing)
- [Salary Expectations](#salary-expectations)

## Project Overview
This application allows users to register, log in, and manage tasks (view, create, update, delete). The focus is on functionality, code clarity, and correctness. The backend is implemented using Node.js/Express with TypeScript and PostgreSQL for data persistence, while the frontend is built with React and TypeScript.

## Database Setup

### Migrations
A migration script is provided in the `migrations` folder. To create the necessary tables, run the following SQL (or use your preferred migration tool):

```sql
-- migrations/create_tables.sql

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_complete BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id)
);
```

To execute the migration via the command line using psql, run:
```bash
psql -U <your_db_username> -d <your_database_name> -f migrations/create_tables.sql
```
Environment Variables
Create a .env file in the backend folder with the following content:
```bash
DATABASE_URL=postgres://<your_db_username>:<your_db_password>@localhost:5432/<your_database_name>
JWT_SECRET=your_jwt_secret
PORT=8080
```
Replace <your_db_username>, <your_db_password>, and <your_database_name> with your actual PostgreSQL credentials and database name.

How to Run the Backend

Open a terminal and navigate to the backend folder:
```bash
cd backend
```
Install the dependencies:
```bash
npm install
```
Start the development server (with auto-reloading using nodemon):
```bash
npm run dev
```
The server will run on the port specified in your .env file (default is 8080).
How to Run the Frontend

Open a separate terminal and navigate to the frontend folder:
```bash
cd frontend
```
Install the dependencies & Start the React development server:
```bash
npm install

npm start
```
Your React application will launch, typically accessible at http://localhost:3000.
Testing


UI Testing:
From the frontend, verify the complete workflow:
Register a new user.
Log in with the registered user.
Create, update, and delete tasks.
Debugging:
Use VS Code’s built-in debugging tools for both the frontend and backend. A sample launch configuration for the backend is available in .vscode/launch.json.
Salary Expectations

My salary expectation for this position is between $2500 and $3000 USD per month.
