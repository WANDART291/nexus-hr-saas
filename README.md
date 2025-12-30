# Nexus HR - Enterprise Human Resource Management API

![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![Django](https://img.shields.io/badge/Django-5.0-green)
![GraphQL](https://img.shields.io/badge/GraphQL-Powered-e10098)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ed)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red)

**Nexus HR** is a modular, scalable, and secure backend API designed to modernize workforce management. Built with an **API-First** philosophy using **Django** and **GraphQL**, it provides a unified interface for managing the entire employee lifecycle—from onboarding and leave management to payroll processing and performance reviews.

The system features a fully automated **CI/CD pipeline powered by Jenkins**, ensuring code quality and seamless deployment.

---

## 🚀 Key Features

### 🏢 Core HR & Multi-Tenancy
* **Organization Management:** scalable structure supporting multiple departments, roles, and positions.
* **Employee Profiles:** Comprehensive digital records for staff data.
* **Authentication:** Secure **JWT (JSON Web Token)** authentication with role-based access control.

### 📅 Leave Management Module
* **Automated Balances:** Logic handles annual, sick, and unpaid leave balances.
* **Approval Workflow:** Managers can approve/reject requests with immediate balance updates.
* **Conflict Detection:** Prevents employees from booking overlapping dates.

### 💰 Payroll Engine
* **Salary Structures:** Flexible definition of Basic Salary, Allowances, and Deductions.
* **Automated Calculation:** "One-Click" payroll processing that computes Gross vs. Net Pay.
* **Digital Payslips:** Generates immutable transaction records for every pay period.

### 📈 Performance Management
* **Goal Tracking:** Assign and track OKRs (Objectives and Key Results) with due dates.
* **Review Cycles:** Conduct quarterly or annual performance reviews with scoring (1-5 scale).
* **Feedback Loops:** Reviewer-to-employee feedback mechanisms.

### ⚙️ DevOps & Automation
* **Containerization:** Fully Dockerized environment for consistency across Dev/Prod.
* **CI/CD Pipeline:** **Jenkins** pipelines configured to run automated tests and linting on every commit.
* **Audit Trails:** Security logging of sensitive actions (e.g., salary changes) for compliance.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend Framework** | Python & Django | Robust, enterprise-grade web framework. |
| **API Layer** | Graphene (GraphQL) | Flexible query language preventing over-fetching. |
| **Database** | PostgreSQL | Relational database for complex data integrity. |
| **Authentication** | Django GraphQL JWT | Stateless, secure token-based auth. |
| **DevOps / CI/CD** | **Jenkins** | Automated build, test, and deployment pipelines. |
| **Containerization** | Docker & Docker Compose | Consistent development and deployment environments. |

---

## ⚡ Why GraphQL?

Unlike traditional REST APIs that require multiple endpoints (`/users`, `/payroll`, `/leave`), Nexus HR utilizes a **Single Endpoint Architecture**.
* **Efficiency:** Clients request exactly the data they need—no more, no less.
* **Speed:** Fetch an employee's profile, their current leave balance, and their latest payslip in a **single network request**.

---

## 🔌 API Examples

The API is self-documenting via GraphiQL. Below are examples of how the system handles complex logic.

### 1. The "Everything" Query
*Fetching an employee's profile, leave balance, and latest review in one shot.*

```graphql
query {
  myProfile {
    firstName
    lastName
    department { name }
  }
  myLeaveBalances {
    leaveType { name }
    balance
  }
  myReviews {
    score
    feedback
    reviewPeriod
  }
}

You are absolutely right. Including Jenkins is a huge "green flag" for recruiters because it shows you understand DevOps and automation, not just coding.

Here is the Updated Professional README with Jenkins added to the Badges, Features, and Tech Stack sections.

Replace your current README.md with this version:

Markdown

# Nexus HR - Enterprise Human Resource Management API

![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![Django](https://img.shields.io/badge/Django-5.0-green)
![GraphQL](https://img.shields.io/badge/GraphQL-Powered-e10098)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ed)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red)

**Nexus HR** is a modular, scalable, and secure backend API designed to modernize workforce management. Built with an **API-First** philosophy using **Django** and **GraphQL**, it provides a unified interface for managing the entire employee lifecycle—from onboarding and leave management to payroll processing and performance reviews.

The system features a fully automated **CI/CD pipeline powered by Jenkins**, ensuring code quality and seamless deployment.

---

## 🚀 Key Features

### 🏢 Core HR & Multi-Tenancy
* **Organization Management:** scalable structure supporting multiple departments, roles, and positions.
* **Employee Profiles:** Comprehensive digital records for staff data.
* **Authentication:** Secure **JWT (JSON Web Token)** authentication with role-based access control.

### 📅 Leave Management Module
* **Automated Balances:** Logic handles annual, sick, and unpaid leave balances.
* **Approval Workflow:** Managers can approve/reject requests with immediate balance updates.
* **Conflict Detection:** Prevents employees from booking overlapping dates.

### 💰 Payroll Engine
* **Salary Structures:** Flexible definition of Basic Salary, Allowances, and Deductions.
* **Automated Calculation:** "One-Click" payroll processing that computes Gross vs. Net Pay.
* **Digital Payslips:** Generates immutable transaction records for every pay period.

### 📈 Performance Management
* **Goal Tracking:** Assign and track OKRs (Objectives and Key Results) with due dates.
* **Review Cycles:** Conduct quarterly or annual performance reviews with scoring (1-5 scale).
* **Feedback Loops:** Reviewer-to-employee feedback mechanisms.

### ⚙️ DevOps & Automation
* **Containerization:** Fully Dockerized environment for consistency across Dev/Prod.
* **CI/CD Pipeline:** **Jenkins** pipelines configured to run automated tests and linting on every commit.
* **Audit Trails:** Security logging of sensitive actions (e.g., salary changes) for compliance.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend Framework** | Python & Django | Robust, enterprise-grade web framework. |
| **API Layer** | Graphene (GraphQL) | Flexible query language preventing over-fetching. |
| **Database** | PostgreSQL | Relational database for complex data integrity. |
| **Authentication** | Django GraphQL JWT | Stateless, secure token-based auth. |
| **DevOps / CI/CD** | **Jenkins** | Automated build, test, and deployment pipelines. |
| **Containerization** | Docker & Docker Compose | Consistent development and deployment environments. |

---

## ⚡ Why GraphQL?

Unlike traditional REST APIs that require multiple endpoints (`/users`, `/payroll`, `/leave`), Nexus HR utilizes a **Single Endpoint Architecture**.
* **Efficiency:** Clients request exactly the data they need—no more, no less.
* **Speed:** Fetch an employee's profile, their current leave balance, and their latest payslip in a **single network request**.

---

## 🔌 API Examples

The API is self-documenting via GraphiQL. Below are examples of how the system handles complex logic.

### 1. The "Everything" Query
*Fetching an employee's profile, leave balance, and latest review in one shot.*

```graphql
query {
  myProfile {
    firstName
    lastName
    department { name }
  }
  myLeaveBalances {
    leaveType { name }
    balance
  }
  myReviews {
    score
    feedback
    reviewPeriod
  }
}
2. Processing Payroll (Mutation)
The engine calculates net pay automatically based on the stored salary structure.

GraphQL

mutation {
  processPayroll(employeeId: 1, month: "December", year: 2025) {
    success
    payslip {
      basicSalary
      totalAllowances
      totalDeductions
      netPay  # <--- Automatically Calculated
    }
  }
}

🔧 Getting Started (Local Dev)
This project is fully containerized using Docker.

Prerequisites:

Docker Desktop installed.

Git.

Installation:

Clone the repository:

Bash

git clone [https://github.com/YOUR_USERNAME/nexus-hr-saas.git](https://github.com/YOUR_USERNAME/nexus-hr-saas.git)
cd nexus-hr-saas
Start the Container:

Bash

docker compose up --build
Run Migrations:

Bash

docker compose exec web python manage.py migrate
Access the API: Open your browser to: http://localhost:8000/graphql

🗺️ Roadmap
[ ] Frontend Dashboard: React/Next.js Admin Panel.

[ ] Cloud Deployment: AWS/Railway production environment.

[ ] Email Notifications: Celery & Redis integration for automated alerts.

[ ] Report Generation: PDF export for Payslips.

👤 Author
[Wandile Khanyile]

Backend Developer | Python & Django Specialist

Built with ❤️ in South Africa.