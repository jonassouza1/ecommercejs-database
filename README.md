# 🗃️ E-commerce Backend DB — Product & Database API

This is the **database and product service** for a modular e-commerce application. Built with **Node.js + Express + PostgreSQL**, it serves as the API that provides **product data** and interacts with the **Neon/PostgreSQL** database.

> 🧩 This project is part of a complete system, which includes:
> - [`frontend`](https://github.com/jonassouza1/ecommercejs-frontend-site): Customer interface
> - [`backend-api`](https://github.com/jonassouza1/ecommercejs-backend-site): Payments, Mercado Pago integration and email notifications

---

## 🛠️ Technologies Used

- **Node.js 18+**
- **Express.js** — API routing
- **PostgreSQL** — hosted on [Neon](https://neon.tech/)
- **pg** — PostgreSQL client for Node.js
- **node-pg-migrate** — schema migrations
- **Dotenv** — environment variable management
- **Docker Compose** — for local database setup
- **CORS** — cross-origin resource sharing

---

## 📦 Features

### 🛍️ Product API

- Provides product data to the  payment backend
- Queryable endpoints for product listing
- All data is served from a PostgreSQL database

### 🗄️ Database Management

- PostgreSQL schema versioning with `node-pg-migrate`
- `.env`-based configuration for environments (dev, prod, etc.)
- Local development uses Docker Compose to spin up database containers

---

## 📁 File Structure (Simplified)

```bash
.
├── index.js                    # Main server entry point
├── package.json                # Project config and dependencies

├── infra/
│   ├── compose.yaml            # Docker Compose config for PostgreSQL container
│   ├── database.js             # Centralized DB connection configuration
│   └── migrations/             # Database migration files (used with node-pg-migrate)

├── model/
│   ├── database-manipulation-functions/   # Functions for inserting, updating, and querying DB records
│   ├── database-status/                   # Endpoints or utilities for checking DB health/status
│   ├── migrations-runner-endpoint/        # Logic to run migrations via API route
│   └── token/                             # Token  validation logic
                 
                
