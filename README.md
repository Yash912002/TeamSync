# Advanced MERN B2B Teams Project Management SaaS - *TeamSync*  

---

## Project Overview  

**TeamSync** is a powerful and scalable multi-tenancy project management system built with **Node.js**, **MongoDB**, and **React**. Designed for real-world B2B needs, this project delivers features like Google Sign-In, workspace management, project tracking, task collaboration, role-based permissions, and more. Perfect for developers aiming to create SaaS-based team collaboration platforms.  

---

## Key Features  

- **Authentication** (Google Sign-In, Email, Password)
- **Create & Manage Multiple Workspaces**
- **Projects & Epics Management**
- **Tasks** (CRUD, Status, Priority, Assignee)
- **Roles & Permissions** (Owner, Admin, Member)
- **Invite Members to Workspaces**
- **Filters & Search** (Status, Priority, AssignedTo)
- **Analytics Dashboard**
- **Pagination & Load More**
- **Cookie Session Management**
- **Logout & Session Termination**
- **Seeding** for Test Data
- **Mongoose Transactions** for Robust Data Integrity

---

## Tools & Technologies  

- **Node.js**: Scalable backend architecture  
- **React.js**: Dynamic frontend framework  
- **MongoDB & Mongoose**: Flexible and scalable database solutions  
- **Google OAuth**: Seamless Google Sign-In integration  
- **TypeScript**: For a type-safe codebase  
- **TailwindCSS & Shadcn UI**: Beautiful, responsive design  
- **Vite.js**: Lightning-fast frontend development  

---

## Frontend Folder structure

```bash
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── constant/
│   ├── context/
│   ├── hoc/
│   ├── hooks/
│   ├── layout/
│   ├── lib/
│   ├── page/
│   ├── routes/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Backend Folder structure

```bash
backend/
  ├── src/
  │ ├── @types/
  │ ├── config/
  │ ├── controllers/
  │ ├── enums/
  │ ├── middlewares/
  │ ├── models/
  │ ├── routes/
  │ ├── seeders/
  │ ├── services/
  │ ├── utils/
  │ └── validation/
  │ └── index.ts
  ├── .env.example
  ├── .gitignore
  ├── package-lock.json
  ├── package.json
  └── tsconfig.json
```

---

# API Endpoints

**Base URL:** `http://localhost:8000/api`

## Auth Routes

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| POST   | /auth/register          | Register a new user                  |
| POST   | /auth/login             | Authenticate user and return token   |
| POST   | /auth/logout            | Logout the authenticated user        |
| GET    | /auth/google            | Initiate Google OAuth flow           |
| GET    | /auth/google/callback   | Google OAuth callback                |

## Member Routes

| Method | Endpoint                                | Description            |
|--------|-----------------------------------------|------------------------|
| POST   | /member/workspace/:inviteCode/join      | Join a workspace       |

## Project Routes

| Method | Endpoint                                             | Description                          |
|--------|------------------------------------------------------|--------------------------------------|
| POST   | /project/workspace/:workspaceId/create               | Create a new project                 |
| PUT    | /project/:id/workspace/:workspaceId/update           | Update an existing project           |
| DELETE | /project/:id/workspace/:workspaceId/delete           | Delete a project                     |
| GET    | /project/workspace/:workspaceId/all                  | Get all projects in a workspace      |
| GET    | /project/:id/workspace/:workspaceId/analytics        | Get analytics for a project          |
| GET    | /project/:id/workspace/:workspaceId                  | Get project details by ID            |

## Task Routes

| Method | Endpoint                                                           | Description                    |
|--------|--------------------------------------------------------------------|--------------------------------|
| POST   | /task/project/:projectId/workspace/:workspaceId/create             | Create a new task              |
| DELETE | /task/:id/workspace/:workspaceId/delete                            | Delete a task                  |
| PUT    | /task/:id/project/:projectId/workspace/:workspaceId/update         | Update an existing task        |
| GET    | /task/workspace/:workspaceId/all                                   | Get all tasks in a workspace   |
| GET    | /task/:id/project/:projectId/workspace/:workspaceId                | Get task details by ID         |

## User Routes

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| GET    | /user/current    | Get current user data |

## Workspace Routes

| Method | Endpoint                                 | Description                                |
|--------|------------------------------------------|--------------------------------------------|
| POST   | /workspace/create/new                    | Create a new workspace                     |
| PUT    | /workspace/update/:id                    | Update workspace details by ID             |
| PUT    | /workspace/change/member/role/:id        | Change a workspace member’s role           |
| DELETE | /workspace/delete/:id                    | Delete a workspace by ID                   |
| GET    | /workspace/all                           | Get all workspaces the user is part of     |
| GET    | /workspace/members/:id                   | Get all members of a workspace             |
| GET    | /workspace/analytics/:id                 | Get workspace analytics                    |
| GET    | /workspace/:id                           | Get workspace details by ID                |

---

## Getting Started  

### 1. Set Up Environment Variables  

Create a `.env` file in the root of your project and configure these variables:  

```bash  
PORT=8000
NODE_ENV=development
MONGO_URI="mongodb+srv://<username>:<password>@<>.mongodb.net/teamsync_db"  

SESSION_SECRET="session_secret_key"

GOOGLE_CLIENT_ID=<your-google-client-id>  
GOOGLE_CLIENT_SECRET=<your-google-client-secret>  
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

FRONTEND_ORIGIN=http://localhost:3000
FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:3000/google/callback
```  

### 3. Run the Application  

Install dependencies and start the development server:  

```bash  
npm install  
npm run dev  
```  

Access the backend at `http://localhost:8000`.  

---

## Deploying TeamSync  

### 1. Add Environment Variables  
Add the `.env` variables to your hosting platform (e.g., Vercel).  

### 2. Deploy  
Deploy your app using your preferred method to make it live.