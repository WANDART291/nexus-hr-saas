# Nexus HR - Enterprise Workforce Management System

![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![React](https://img.shields.io/badge/Frontend-React_18-61DAFB)
![Django](https://img.shields.io/badge/Backend-Django_Rest_Framework-green)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)
![Docker](https://img.shields.io/badge/Deployment-Docker_Containerized-2496ed)

**Nexus HR** is a complete, full-stack SaaS platform designed to modernize workforce management. Unlike simple administrative tools, Nexus HR provides a **decoupled microservices architecture** combining a high-performance **React** frontend with a robust **Django** calculation engine.

It automates the most complex parts of HR: payroll taxation logic, real-time leave conflict detection, and secure employee data management.

---

## 🚀 Key Features

### 🖥️ Interactive Dashboard (Frontend)
* **Real-Time Analytics:** Live widgets tracking total employees, pending leave requests, and payroll status.
* **Responsive Design:** Fully responsive UI built with **Tailwind CSS**, optimized for desktop and mobile management.
* **Role-Based Access:** specialized views for Admin vs. Standard Employees.

### 💰 Automated Payroll Engine
* **One-Click Processing:** Algorithms automatically calculate Gross Pay, Tax Deductions (20% logic), and Net Pay.
* **Financial Integrity:** Prevents duplicate runs for the same month and generates immutable transaction records.
* **Status Tracking:** Visual indicators for Paid vs. Pending salaries.

### 📅 Smart Leave Management
* **Conflict Detection:** Backend logic prevents overlapping leave requests before they are saved.
* **Balance Tracking:** Automatic deduction from Annual/Sick leave quotas.
* **Approval Workflow:** Managerial interface to Approve/Reject requests.

### 🏢 Employee Directory
* **Digital Onboarding:** Add new staff with automated validation for unique emails.
* **Dynamic Profiles:** Integrates with `Pravatar` to generate consistent, unique profile images for every user.
* **Search & Filter:** Instant client-side filtering for rapid team management.

---

## 🛠️ Technology Stack

### **Frontend (Client-Side)**
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS + Lucide Icons
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Networking:** Axios with Interceptors for JWT Token refreshment

### **Backend (Server-Side)**
* **Framework:** Python / Django 5.0
* **API Architecture:** Django REST Framework (DRF)
* **Authentication:** JWT (JSON Web Tokens)
* **Database:** PostgreSQL (Relational Data Integrity)

### **DevOps & Infrastructure**
* **Containerization:** Docker & Docker Compose (Multi-container orchestration)
* **Storage:** WhiteNoise for static asset serving

---

## 📸 System Previews

| **Payroll Engine** | **Employee Management** |
|:---:|:---:|
| *Automated calculation of taxes and net pay.* | *responsive grid with real-time search.* |
| ![Payroll](https://via.placeholder.com/400x200?text=Insert+Payroll+Screenshot) | ![Employees](https://via.placeholder.com/400x200?text=Insert+Employee+Screenshot) |

---

## 🔧 Getting Started (Local Development)

This project is fully containerized. You can launch the entire stack (Frontend + Backend + Database) with one command.

### Prerequisites
* Docker Desktop installed.
* Git.

### Installation

**1. Clone the repository**
```bash
git clone [https://github.com/YOUR_USERNAME/nexus-hr-saas.git](https://github.com/YOUR_USERNAME/nexus-hr-saas.git)
cd nexus-hr-saas

2. Start the Application

Bash

docker compose up --build


3. Run Database Migrations

Bash

docker compose exec web python manage.py migrate

4. Access the System

Frontend Dashboard: http://localhost:5173

Backend API: http://localhost:8000/api/



# Nexus HR - Enterprise Workforce Management System

![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen)
![React](https://img.shields.io/badge/Frontend-React_18-61DAFB)
![Django](https://img.shields.io/badge/Backend-Django_Rest_Framework-green)
![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)
![Docker](https://img.shields.io/badge/Deployment-Docker_Containerized-2496ed)

**Nexus HR** is a complete, full-stack SaaS platform designed to modernize workforce management. Unlike simple administrative tools, Nexus HR provides a **decoupled microservices architecture** combining a high-performance **React** frontend with a robust **Django** calculation engine.

It automates the most complex parts of HR: payroll taxation logic, real-time leave conflict detection, and secure employee data management.

---

## 🚀 Key Features

### 🖥️ Interactive Dashboard (Frontend)
* **Real-Time Analytics:** Live widgets tracking total employees, pending leave requests, and payroll status.
* **Responsive Design:** Fully responsive UI built with **Tailwind CSS**, optimized for desktop and mobile management.
* **Role-Based Access:** specialized views for Admin vs. Standard Employees.

### 💰 Automated Payroll Engine
* **One-Click Processing:** Algorithms automatically calculate Gross Pay, Tax Deductions (20% logic), and Net Pay.
* **Financial Integrity:** Prevents duplicate runs for the same month and generates immutable transaction records.
* **Status Tracking:** Visual indicators for Paid vs. Pending salaries.

### 📅 Smart Leave Management
* **Conflict Detection:** Backend logic prevents overlapping leave requests before they are saved.
* **Balance Tracking:** Automatic deduction from Annual/Sick leave quotas.
* **Approval Workflow:** Managerial interface to Approve/Reject requests.

### 🏢 Employee Directory
* **Digital Onboarding:** Add new staff with automated validation for unique emails.
* **Dynamic Profiles:** Integrates with `Pravatar` to generate consistent, unique profile images for every user.
* **Search & Filter:** Instant client-side filtering for rapid team management.

---

## 🛠️ Technology Stack

### **Frontend (Client-Side)**
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS + Lucide Icons
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Networking:** Axios with Interceptors for JWT Token refreshment

### **Backend (Server-Side)**
* **Framework:** Python / Django 5.0
* **API Architecture:** Django REST Framework (DRF)
* **Authentication:** JWT (JSON Web Tokens)
* **Database:** PostgreSQL (Relational Data Integrity)

## 🏗️ Database Architecture
![ERD Diagram](./docs/erd_diagram.png)

### **DevOps & Infrastructure**
* **Containerization:** Docker & Docker Compose (Multi-container orchestration)
* **Storage:** WhiteNoise for static asset serving

---

## 📸 System Previews

| **Payroll Engine** | **Employee Management** |
|:---:|:---:|
| *Automated calculation of taxes and net pay.* | *responsive grid with real-time search.* |
| ![Payroll](https://via.placeholder.com/400x200?text=Insert+Payroll+Screenshot) | ![Employees](https://via.placeholder.com/400x200?text=Insert+Employee+Screenshot) |

---

## 🔧 Getting Started (Local Development)

This project is fully containerized. You can launch the entire stack (Frontend + Backend + Database) with one command.

### Prerequisites
* Docker Desktop installed.
* Git.

### Installation

**1. Clone the repository**
```bash
git clone [https://github.com/YOUR_USERNAME/nexus-hr-saas.git](https://github.com/YOUR_USERNAME/nexus-hr-saas.git)
cd nexus-hr-saas
2. Start the Application

Bash

docker compose up --build
3. Run Database Migrations

Bash

docker compose exec web python manage.py migrate
4. Access the System

Frontend Dashboard: http://localhost:5173

Backend API: http://localhost:8000/api/

🗺️ Roadmap & Architecture
Current Version (v1.0): REST API architecture for maximum compatibility and ease of debugging.

Future Version (v2.0): Planned refactor to GraphQL to optimize data fetching for mobile clients.

Deployment: configured for hybrid cloud deployment (Vercel Frontend + Render Backend).

👤 Author
Wandile Khanyile Full Stack Software Engineer | Python & React Specialist

Built with ❤️ in South Africa.
