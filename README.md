#  Freelance Marketplace Platform

A robust full-stack web application connecting clients (Gig Owners) with skilled freelancers. This platform allows users to post projects, place bids, and manage the hiring process seamlessly using a modern **MERN (MongoDB, Express, React, Node.js)** architecture.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-000000?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Features

###  Authentication & Security
* **Secure Login/Signup:** JWT-based authentication using HTTP-Only cookies.
* **Role-Based Access:** Unified user system allowing everyone to both post gigs and bid on them.
* **Route Protection:** Global `AuthContext` ensures restricted pages (Dashboard, Create Gig) are only accessible to logged-in users.

### Gig Management
* **Post Gigs:** Clients can create detailed project listings with titles, descriptions, budgets, and deadlines.
* **Smart Filtering:** View gigs with advanced sorting (Newest first) and pagination.
* **Rich Data:** Gigs display owner details and status (Open, Assigned, Completed).

### Bidding & Hiring System
* **Place Bids:** Freelancers can bid on open projects.
* **Review Bids:** Gig owners can see all bids for their project.
* **Hiring Workflow:** Owners can accept a bid, which updates the gig status and links the freelancer via **nested database population**.

###  Dashboard
* **Client View:** See active gigs and who you have hired.
* **Freelancer View:** View all available Gigs and apply to them.

---

##  Tech Stack

### **Frontend (`/Frontend`)**
* **React.js (Vite):** Blazing fast build tool and modular component architecture.
* **Tailwind CSS:** Utility-first framework for responsive, modern UI.
* **React Router DOM:** Client-side routing with protected route guards.
* **React Hot Toast:** Beautiful, animated notifications.
* **Axios:** For handling HTTP requests with credential support.

### **Backend (`/Backend`)**
* **Node.js & Express.js:** RESTful API architecture.
* **MongoDB & Mongoose:** NoSQL database using advanced schemas and aggregation/population.
* **JWT (JSON Web Tokens):** Secure stateless authentication.
* **Cookie-Parser:** Secure handling of auth tokens.

---