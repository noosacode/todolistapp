# Todo App

## Overview
This Todo App is a lightweight task‑management system built using **Express**, **MongoDB**, and **Mongoose**. It provides authenticated CRUD functionality for managing **jobs**, along with a simple two‑page frontend interface.

The app includes:

- Express server  
- MongoDB / Mongoose  
- User login  
- JWT authentication  
- Password hashing with bcrypt  
- CRUD API for jobs  
- Two‑page frontend for viewing and managing jobs  
- Vercel‑ready deployment structure  

This project is intentionally simple and focused to meet assignment requirements while still demonstrating full‑stack functionality.

---

## Project Structure

```
backend/
├── middleware/
│   └── auth.js
└── models/
    ├── Job.js
    └── User.js

public/
├── css/
│   └── style.css
├── js/
│   ├── jobs.js
│   ├── view-jobs.js
│   ├── login.js
│   └── logout.js
├── index.html
└── view-jobs.html

server.js
.env
.gitignore
package.json
package-lock.json
```

### Notes
- The frontend consists of **two pages**:  
  - `index.html` — create and manage jobs  
  - `view-jobs.html` — view jobs by user  
- All job operations require authentication.

---

## Models

### Job Model (`Job.js`)
Fields include:

- **title** — job name  
- **description** — optional details  
- **createdAt**  
- **updatedAt**  

This model represents a single job entry created by an authenticated user.

### Task Model (Optional / Future Expansion)
If expanded into a full project manager app, tasks may include:

- **title**  
- **description**  
- **priority** (low / medium / high)  
- **taskCategory**  
- **projectId**  
- **createdAt**  
- **updatedAt**  

These fields are placeholders for future development and are not required for the current assignment.

---

## Authentication

Authentication follows a standard JWT workflow:

1. Users log in via **POST /login**.  
2. Passwords are hashed using **bcrypt**.  
3. The server returns a **JWT**.  
4. The frontend stores the token and includes it in all authenticated requests.  
5. All job CRUD routes require a valid token.

---

## CRUD API — Jobs

```
GET    /api/jobs
POST   /api/jobs
GET    /api/jobs/:id
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

### Additional Feature
On `view-jobs.html`, users can select any user and view all jobs associated with that user.

---

## Frontend

The frontend provides:

- Login page  
- Job creation form  
- Job list showing title, description, and creation date  
- Buttons for editing and deleting jobs  
- A second page (`view-jobs.html`) for viewing jobs by user  

This layout keeps the app simple and easy to use while meeting assignment requirements.

---

## Environment Variables

Your `.env` file contains:

```
MONGODB_URI=
JWT_SECRET=
```

These values must also be added to the Vercel project settings.

---

## Deployment

The app is deployed to **Vercel**.

Required environment variables:

- `MONGODB_URI`  
- `JWT_SECRET`  


----------version 2--------------

Todo App — Assignment Documentation

A lightweight, authenticated job‑management web application built using Express, MongoDB, and Mongoose, designed to meet all assignment requirements while remaining simple and easy to use.

Overview
This Todo App allows users to log in, create jobs, view jobs, update jobs, and delete jobs. It includes a secure backend, a clean two‑page frontend, and full database integration. All required RESTful API, data persistence, indexing, and testing criteria have been implemented.

Assignment Requirements Summary
This project satisfies all required elements:
Backend web application built using JavaScript (Node.js + Express).
More than 10 pages total (HTML, JS, CSS, JSON, server files, models).
Full database integration using MongoDB Atlas.
Data retrieved and displayed on two different browsers.
RESTful API endpoints built and tested.
Data persistence implemented (create, update, delete).
At least two indexes created in MongoDB.
Partition and sort keys used (jobs grouped by user, sorted by creation date).
Dynamic content added on both client‑side and server‑side.
All pages tested on Edge and Firefox and Windows PC and smartphone.
Development complies with organisational and legal standards.

Project Structure

backend/
├── middleware/
│   └── auth.js
└── models/
    ├── Job.js
    └── User.js

public/
├── css/
│   └── style.css
├── js/
│   ├── jobs.js
│   ├── view-jobs.js
│   ├── login.js
│   └── logout.js
├── index.html
└── view-jobs.html

server.js
.env
.gitignore
package.json
package-lock.json

This project contains more than 10 pages, including:
2 HTML files
1 CSS file
4 JavaScript frontend files
2 Mongoose model files
1 Express server file
1 JSON configuration file (package.json)

Models
Job Model (Job.js)
Fields include:
title — job name
description — optional details
createdAt — timestamp
updatedAt — timestamp
User Model (User.js)

Fields include:
username
password (hashed using bcrypt)
createdAt

Indexes
To optimise performance, the following indexes were created:
username index in User.js
createdAt index in Job.js

These indexes improve login lookup speed and job sorting efficiency.

Partition & Sort Keys
Jobs are partitioned by user (each job belongs to a specific user).
Jobs are sorted by creation date when displayed.

Authentication
Authentication uses a secure JWT workflow:
Users log in via POST /login.
Passwords are hashed using bcrypt.
A JWT is returned.
The frontend stores the token.
All job CRUD routes require authentication.
RESTful API Endpoints

Jobs
GET    /api/jobs
POST   /api/jobs
GET    /api/jobs/:id
PUT    /api/jobs/:id
DELETE /api/jobs/:id

Testing
All endpoints were tested using:
The frontend pages

Frontend
The frontend consists of two pages:
index.html
Login form

Job creation form
Job list (title, description, creation date)
Edit and delete buttons

view-jobs.html
Dropdown to select any user
Displays all jobs belonging to the selected user

Dynamic Content
Jobs are dynamically loaded from the API.
Pages update automatically after creating, editing, or deleting jobs.
Server‑side dynamic content is provided through Express routes.

Environment Variables

The .env file contains:
MONGODB_URI=
JWT_SECRET=

These values are also configured in Vercel.

Deployment
The app is deployed to Vercel.
Required environment variables:

MONGODB_URI
JWT_SECRET

MongoDB Atlas network access was configured to allow Vercel connections.

Compliance
This project complies with organisational and legal standards:
No copyrighted assets were used.
Passwords are securely hashed.
Sensitive data is stored in .env and not committed to GitHub.
All dependencies are open‑source.

Final Notes
This Todo App is intentionally simple to meet assignment requirements while demonstrating:
Full backend functionality
Secure authentication
RESTful API design
Database integration
Dynamic frontend behaviour
Proper testing and compliance

It also provides a foundation for future expansion into a full project‑management system if desired.
