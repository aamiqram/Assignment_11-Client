# LocalChefBazaar 🍳 — Marketplace for Local Home-Cooked Meals

**Live Demo:**

## Project Overview

LocalChefBazaar is a full-stack MERN marketplace that connects passionate home cooks (chefs) with customers craving fresh, authentic, homemade meals. Customers can browse daily menus, place orders, leave reviews, and track orders — all while supporting local talent.

Chefs can showcase their culinary skills, upload menus, manage orders, and earn from their kitchen. Admins oversee the platform with full control over users and requests.

Built with modern technologies for performance, security, and beautiful user experience.

## Key Features

### Public Features

- Animated Hero section with Framer Motion
- Browse meals with search, sort (price asc/desc), and pagination (10 per page)
- Meal details with reviews, rating, and "Add to Favorite"
- Secure Firebase Authentication (Login/Register with image upload)
- Responsive design (mobile-first) with Dark/Light theme toggle

### User (Customer)

- Place orders with quantity selection and total calculation
- View order history
- Manage reviews (add, update, delete)
- View favorite meals

### Chef

- Create, update, delete meals (with image upload)
- Manage incoming orders (Accept / Cancel / Deliver)
- Real-time status updates

### Admin

- Manage all users (Make Fraud → blocks ordering/creating meals)
- Approve/Reject Chef & Admin role requests (auto-generates unique Chef ID)
- Platform statistics dashboard with Recharts

### Security & Tech Highlights

- Firebase Authentication + JWT (httpOnly cookie) for secure protected routes
- Axios interceptors for automatic token attachment
- react-hook-form in every form
- Dynamic page titles on all routes
- TanStack Query for efficient data fetching
- SweetAlert2 for beautiful confirmations and toasts

## Technologies Used

### Frontend

- React 18 + Vite
- React Router v6
- Tailwind CSS + DaisyUI
- Framer Motion (animations)
- Firebase Authentication
- TanStack React Query
- React Hook Form
- Axios + Interceptors
- SweetAlert2
- Recharts (admin stats)
- JWT Decode

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Firebase Admin SDK (token verification)
- JSON Web Token (JWT)
- CORS & Cookie Parser

## npm Packages Used

```
Client:
react-router-dom firebase tailwindcss daisyui framer-motion
@tanstack/react-query react-hook-form axios sweetalert2
recharts react-icons jwt-decode

Server:
express mongodb mongoose cors cookie-parser jsonwebtoken firebase-admin dotenv
```
