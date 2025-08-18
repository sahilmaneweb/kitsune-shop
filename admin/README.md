# 🦊 Kitsune Shop Admin Dashboard

> **Live Demo:** [https://kitsune-shop-admin.vercel.app/](https://kitsune-shop-admin.vercel.app/)

> **Tags:** #React #Vite #TailwindCSS #AdminPanel #Ecommerce #Dashboard #ProtectedRoutes #RESTAPI #JWT #Axios #Zod

## 🚀 Overview

Kitsune Shop Admin Dashboard is a modern, responsive admin panel for managing products and orders in an e-commerce store. Built with React, Vite, and TailwindCSS, it provides a seamless experience for admins to add products, view orders, and monitor store statistics.

---

## ✨ Features

- 🔒 **Admin Authentication:** Secure login with JWT token, protected routes.
- 📦 **Product Management:** Add, list, filter, and toggle visibility of products.
- 🛒 **Order Management:** View, filter, and update order statuses (pending, confirmed, cancelled).
- 📊 **Dashboard Stats:** Real-time revenue, product, and order statistics.
- 🖼️ **Image Upload:** Drag-and-drop product image upload with preview.
- 🌈 **Responsive UI:** Beautiful, mobile-friendly design using TailwindCSS.
- ⚡ **Fast Development:** Powered by Vite for instant HMR and builds.
- 🧩 **Component-Based:** Clean, modular React components.
- 🔔 **Toast Notifications:** User feedback for all actions.
- 🛡️ **Validation:** Zod-powered frontend validation for forms.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, TailwindCSS
- **State & Routing:** React Context, React Router v6
- **API Calls:** Axios
- **Icons:** React Icons
- **Notifications:** React Hot Toast
- **Validation:** Zod
- **Linting:** ESLint

---

## 🗂️ Project Structure

```
src/
  App.jsx
  main.jsx
  App.css
  index.css
  assets/
    kitsune-logo.png
    react.svg
  components/
    DashboardLayout.jsx
    Fileui.jsx
    ListUI.jsx
    OrderUI.jsx
    Admin/
      AddProduct.jsx
      AdminLogin.jsx
      AllOrder.jsx
      Dashboard.jsx
      Home.jsx
      ListProduct.jsx
      LoginForm.jsx
      ProtectedRoute.jsx
    Navbar/
      Aside.jsx
      Navbar.jsx
  context/
    AuthProvider.jsx
  services/
    api.js
  validators/
    adminFrontendValidators.js
public/
  kitsune-logo.png
  vite.svg
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SERVER_URL="http://localhost:8080/"
```

- **VITE_SERVER_URL:** The base URL for your backend API.

---

## 🧬 Model Structure

### Product Model (API Response Example)
```json
{
  "_id": "string",
  "name": "string",
  "category": "kitsune-tshirt | kitsune-shirt | kitsune-headgear",
  "offerPrice": "number",
  "price": "number",
  "description": "string",
  "productUrl": "string",
  "isVisible": "boolean"
}
```

### Order Model (API Response Example)
```json
{
  "_id": "string",
  "userName": "string",
  "userEmail": "string",
  "userContact": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipcode": "string"
  },
  "items": [
    {
      "name": "string",
      "imageUrl": "string",
      "size": "string",
      "quantity": "number",
      "price": "number"
    }
  ],
  "amount": "number",
  "date": "ISODate",
  "status": "pending | confirmed | cancelled"
}
```

---

## 🏁 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/kitsune-shop-admin.git
   cd kitsune-shop-admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and set your backend URL.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🧑‍💻 Usage

- **Login:** Use your admin credentials to log in.
- **Dashboard:** View revenue, product, and order stats.
- **Add Product:** Fill in product details and upload an image.
- **List Products:** Filter by category, toggle visibility.
- **All Orders:** Filter by status, confirm or cancel orders.

---

## 📝 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint codebase

---

## 🛡️ Protected Routes

All dashboard routes are protected. Only authenticated admins can access them.

---

## 📦 API Service

All API calls are handled via `src/services/api.js` using Axios. JWT token is stored in `localStorage` and attached to requests.

---

## 🖼️ UI/UX

- **Navbar:** Logout button, Kitsune logo
- **Aside:** Quick navigation to dashboard, add product, products, and orders
- **Toast:** Success/error notifications for all actions

---

## 🏷️ License

MIT

---

## 👨‍💻 Author

Made with ❤️ by [Sahil Mane](https://github.com/sahilmaneweb)

---
