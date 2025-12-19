# Garments Order & Production Tracker System


## Table of Contents
- [Project Overview](#project-overview)
- [Live Demo](#live-demo)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Dashboard Overview](#dashboard-overview)


---

## Project Overview
The **Garments Order & Production Tracker System** is a web-based platform designed for small and medium-sized garment factories to efficiently manage their production workflow. This system simplifies the tracking of orders from buyers, monitors inventory, manages production stages (cutting, sewing, finishing), and ensures timely delivery.

This project includes role-based access for **Admin**, **Manager**, and **Buyer** users, with secure authentication and real-time tracking of orders.

---

## Live Demo
[Garments Order & Production Tracker System](https://garments-order-tracker.netlify.app)

## Client Repository
[GitHub - Client](https://github.com/Jobayer561/garments-order-production-tracker-client.git)

## Server Repository
[GitHub - Server](https://github.com/Jobayer561/garments-order-production-tracker-server.git)

---

## Technologies Used
- **Frontend:** React.js, Tailwind CSS, DaisyUI, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Authentication (JWT)
- **Payment Integration:** Stripe
- **Deployment:** Vercel (Frontend), Node Server hosted on Vercel/other)
- **Other Tools:** Axios, React Router, React Hook Form

---

## Features

### General Features
- Modern, responsive, and dynamic UI design.
- Smooth animations with Framer Motion.
- Role-based authentication: Admin, Manager, Buyer.
- Fully integrated with backend using MongoDB.
- Toast/SweetAlert notifications for all actions.
- Error handling and 404 page.

### Home Page
- Hero Banner with CTA buttons.
- Featured Products section (6 cards from MongoDB).
- How It Works section (Step-by-step process).
- Customer Feedback carousel.
- Extra 2 custom-designed sections.

### Authentication
- **Login:** Email & password, Google Auth.
- **Register:** Email & password, Name, Photo, Role selection (Buyer/Manager), Status (pending by default).
- Password validation rules (uppercase, lowercase, min 6 characters).

### All Products Page
- Product grid with image, name, category, price, quantity, and "View Details" button.
- Search & filter functionality (optional).

### Product Details Page (Private Route)
- Detailed product info including images/video, price, category, description, features.
- Booking form with validations.
- Conditional payment via Stripe or Cash on Delivery.
- Booking saved in database.

### Admin Dashboard
- Manage Users: Update roles, suspend users with reason.
- Manage Products: Update, delete, show on homepage toggle.
- All Orders: View details, filter by status.
- Analytics dashboard (optional): Charts, statistics, reports.

### Manager Dashboard
- Add Product: Image preview, validations, save product info.
- Manage Products: Update/delete products created by manager.
- Pending Orders: Approve/Reject orders.
- Approved Orders: Add tracking updates for production and shipping stages.
- Profile: View personal info.

### Buyer Dashboard
- My Orders: View placed orders, cancel pending orders.
- Track Order: Timeline of production & shipping.
- Profile: View account info and any suspend feedback.

### Additional Features
- Loading spinners for API calls.
- Responsive layout for mobile, tablet, and desktop.
- Dynamic page titles.
- Dark/Light theme toggle.

---

## Dashboard Overview

| Role    | Access Pages                                           |
| ------- | ----------------------------------------------------- |
| Admin   | Manage Users, All Products, All Orders               |
| Manager | Add Products, Manage Products, Pending Orders, Profile |
| Buyer   | My Orders, Track Order, Profile                       |

---

