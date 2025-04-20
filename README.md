# MagesticMotors - Frontend

🔑 **Admin Login Info:**  
- **Email:** fakhrul@gmail.com  
- **Password:** asdf1234  

🔗 **Live Site (Frontend):** [https://car-shop-frontend-xi.vercel.app/](https://car-shop-frontend-xi.vercel.app/)  
🔗 **Live Server (Backend):** [https://car-shop-backend-amber.vercel.app/](https://car-shop-backend-amber.vercel.app/)

MagesticMotors is a stylish, responsive Car Shop application built with modern technologies, featuring role-based dashboards, secure authentication, and dynamic product interaction.

---

## 🚀 Key Features

### ✅ Public Routes

- **Home Page**
  - Navigation bar with logo, links, and auth buttons
  - Banner section (carousel supported)
  - Featured Products (limit 6) with "View All" redirect
  - Extra content like testimonials or blogs
  - Footer with contact info, links, social icons

- **All Products Page**
  - Search by brand, name, category
  - Filter by price, model, brand, category, availability
  - Dynamic filtering & searching
  - Product cards with "View Details" button

- **Product Details Page**
  - Full product information with image
  - "Buy Now" button → redirects to Checkout

- **About Page**
  - Shop details, mission, and purpose

### 🔐 Private Routes

- **Checkout Page**
  - Displays selected product details
  - Order form with user info, quantity, and payment method
  - Validates stock
  - SurjoPay payment simulation
  - "Order Now" to confirm purchase

- **User Dashboard**
  - View placed orders
  - Update profile info
  - Change password (requires current password)

- **Admin Dashboard**
  - Manage Users: View & deactivate accounts
  - Manage Products: Add, edit, delete, view
  - Manage Orders: Update status & estimated delivery
  - Order Tracking: Real-time updates per order

---

## 🎨 UI/UX & User Feedback

- **Responsive Design:** Fully mobile and desktop-friendly
- **Loaders:** Displayed during API fetches
- **Toasts:** Success/error notifications (login, logout, order, etc.)
- **Error Handling:**
  - Invalid credentials
  - Duplicate email registration
  - Out-of-stock items

---

## 🛠️ Tech Stack

- **React.js**
- **React Router DOM**
- **Axios**
- **Tailwind CSS**
- **React Toastify**
- **JWT for Auth**
- **Vite** (for faster dev server)

---

## ⚙️ Local Setup

### 1. Clone & Install

```bash
git clone https://github.com/tazim5032/car-shop-frontend.git
cd car-shop-frontend
npm install
```

### 2. Create `.env` File

```env
VITE_API_BASE_URL=https://car-shop-backend-amber.vercel.app
```

### 3. Run the Project

```bash
npm run dev
```

---

## ✨ Bonus Feature: Order Tracking

- Users can track their order progress in the dashboard
- Order status (Pending → Processing → Shipped → Delivered)
- Admin can update statuses and set delivery date

---

## 📂 Folder Structure Overview

```
src/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── routes/
├── utils/
├── App.jsx
└── main.jsx
```

---

## 📄 License

MIT License – free to use, modify, and distribute.

---

## 🙌 Author

Developed by **Mohammad Fakhrul Islam**
