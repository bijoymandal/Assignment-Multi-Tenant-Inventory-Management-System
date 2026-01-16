
---

# README.md


# Multi-Tenant Inventory Management System

A SaaS platform where multiple businesses manage their own inventory, suppliers, and orders independently.


## Features Implemented

### Multi-Tenant System
- Each tenant has isolated data
- Users belong to one tenant
- JWT-based tenant isolation

### Role-Based Access
- Owner: Full access
- Manager: Inventory & suppliers
- Staff: Orders only

### Inventory Management
- Products with variants (SKUs)
- Stock tracking per SKU
- Low-stock alerts

### Orders
- Order creation
- Partial fulfillment
- Stock validation
- Cancellations

### Suppliers & Purchase Orders
- Supplier pricing
- Multi-item POs
- Partial deliveries
- Price variance
- Auto stock update

### Dashboard
- Inventory value
- Low-stock items
- Top 5 sellers (30 days)
- Stock movement (7 days)

### Security
- JWT authentication
- Hashed passwords
- Role-based API protection


## Tech Stack

- Frontend: React, React Router
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Auth: JWT, bcrypt
- Docs: Swagger
- Real-time: Socket.io (optional)

---

## Setup Instructions

### 1. Install Dependencies
npm install

### 2. Start MongoDB
mongod

### 3. Create seeder tenant, product,order,purchase order,varient,Supplier
node Seed.js

### 4. create Seed Users (Owner,staff,Manager)
seed userSeede.js

### 5. run server 
npm run dev (frontend)

### 7. Open Swagger
http://localhost:3000/api-docs





