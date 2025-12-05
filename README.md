
# DM2_BACKEND (Data Management II Project)

This repository contains the backend server for my Data Management II university assignment. It is a RESTful API built with **Node.js** and **TypeScript**, demonstrating advanced database interactions using both **Oracle SQL** and **SQLite**.

## 🚀 Features

* **Dual-Database Architecture:** Connects to both an enterprise-grade Oracle Database and a lightweight SQLite database.
* **RESTful API:** Provides endpoints for data CRUD operations.
* **Type Safety:** Fully written in TypeScript for robust code and better developer experience.
* **Environment Configuration:** Uses `.env` for secure database credential management.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **Databases:**
    * **Oracle SQL:** Used for core enterprise data storage (e.g., User management, large datasets).
    * **SQLite:** Used for local caching, session storage, or lightweight data handling (`sqlite3.db`).
* **Libraries:** `oracledb` (or used driver), `sqlite3`, `dotenv`, `express` (assuming Express based on structure).

## 📂 Project Structure

```text
DM2_BACKEND/
├── dist/             # Compiled JavaScript files
├── src/              # Source TypeScript files
│   ├── config/       # Database connection configs (Oracle/SQLite)
│   ├── controllers/  # Request handlers
│   ├── routes/       # API routes
│   └── app.ts        # Entry point
├── data/             # Data scripts or SQL dumps
├── .env              # Environment variables (DB credentials)
├── sqlite3.db        # Local SQLite database file
└── package.json      # Dependencies and scripts
⚙️ Installation & Setup
Clone the repository:

Bash

git clone [https://github.com/WAH-ISHAN/DM2_BACKEND.git](https://github.com/WAH-ISHAN/DM2_BACKEND.git)
cd DM2_BACKEND
Install dependencies:

Bash

npm install
Configure Environment Variables: Create a .env file in the root directory and add your Oracle DB credentials:

Code snippet

ORACLE_USER=your_username
ORACLE_PASS=your_password
ORACLE_CONN=localhost:1521/XEPDB1
PORT=3000
Build the project:

Bash

npm run build
Run the server:

Bash

npm start
# or for development
npm run dev
