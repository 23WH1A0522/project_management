# 🚀 WorkTrack: Full Stack Project Management Platform


**StackTrack** is a robust, full-stack project management application (inspired by tools like Jira and Asana) designed to streamline team collaboration, workspace organization, and task tracking. Built using the modern **MERN Stack** (Mongodb, Express, React, Node.js), it features secure authentication, real-time updates, and automated email notifications.

---

## 📖 Introduction

This platform serves as a centralized hub for teams to manage their workflows. Users can create distinct **Organizations (Workspaces)**, invite team members via email, create multiple **Projects**, and track progress using Kanban-style **Tasks**. The application ensures data integrity and security through Role-Based Access Control (RBAC) and keeps users informed with automated email alerts for task assignments and due dates.

---

## 🏗 System Architecture

The application follows a monolithic client-server architecture with a clear separation of concerns:

1.  **Frontend (Client):** A React application built with Vite, handling the UI, state management, and user interactions.
2.  **Backend (Server):** A Node.js/Express REST API that handles business logic, database operations, and external integrations.
3.  **Database:** A serverless Mongodb database.
4.  **Authentication & Sync:** Clerk handles user identity, syncing user data to the backend database via Webhooks.
5.  **Background Services:** Inngest manages background jobs, such as sending emails and syncing webhook events.

---

## 🛠 Tech Stack

### **Frontend**
* **Framework:** React 18 (Vite)
* **Language:** JavaScript (ES6+)
* **Styling:** Tailwind CSS
* **State Management:** Redux Toolkit
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Icons:** Lucide React
* **Notifications:** React Hot Toast

### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** Mongodb
* **ORM:** Prisma
* **Authentication:** Clerk (Clerk SDK & Middleware)
* **Email Service:** Nodemailer (SMTP via Brevo/Sendinblue)
* **Event Handling:** Inngest (for Webhooks & Cron jobs)
* **Security:** CORS, Dotenv

---

## ✨ Key Features

### 🔐 Authentication & Security
* **Secure Sign-up/Login:** Powered by Clerk (Google OAuth & Email).
* **Role-Based Access Control (RBAC):** Distinct permissions for Workspace Admins vs. Members.
* **Protected Routes:** Middleware ensures only authenticated users access private data.

### 🏢 Workspace Management
* **Multi-Tenancy:** Users can create and switch between multiple Workspaces (Organizations).
* **Team Invitations:** Admins can invite users to workspaces via email.
* **Member Management:** View and manage list of workspace members and their roles.

### 📂 Project & Task Tracking
* **Project Dashboard:** Visual overview of all active projects, status, and progress.
* **Task Management:** Create tasks with rich details: Title, Description, Priority, Due Date, and Status (To Do, In Progress, Done).
* **Task Types:** Categorize work into 'Task', 'Bug', 'Feature', or 'Improvement'.
* **Assignments:** Assign tasks to specific team members.

### 💬 Collaboration
* **Comments:** Real-time commenting system on individual tasks.
* **Activity Feed:** Track project updates and changes.

### 📧 Notifications
* **Email Alerts:** Automated emails sent via Nodemailer when a task is assigned.
* **Due Date Reminders:** Scheduled background jobs (Inngest) send reminders for approaching deadlines.

---

## 🗄 Database Schema

The database is structured using **7 Core Tables** defined in the Prisma schema:

### 1. **User**
* Stores user identity synced from Clerk.
* **Fields:** `id` (String), `name`, `email`, `image`, `createdAt`, `updatedAt`.

### 2. **Workspace**
* Represents an organization or company.
* **Fields:** `id` (UUID), `name`, `slug` (unique), `imageUrl`, `ownerId`.

### 3. **WorkspaceMember**
* Junction table linking Users to Workspaces.
* **Fields:** `id`, `workspaceId`, `userId`, `role` (Admin/Member).

### 4. **Project**
* A container for tasks within a workspace.
* **Fields:** `id`, `name`, `description`, `status`, `priority`, `startDate`, `endDate`, `teamLeadId`.

### 5. **ProjectMember**
* Links workspace members to specific projects.
* **Fields:** `id`, `projectId`, `userId`.

### 6. **Task**
* Individual units of work to be tracked.
* **Fields:** `id`, `title`, `description`, `type`, `status`, `priority`, `dueDate`, `assigneeId`.

### 7. **Comment**
* Discussion threads on specific tasks.
* **Fields:** `id`, `taskId`, `userId`, `content`, `createdAt`.

---
