# 🦊 Kitsune Shop - E-Commerce Backend

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen?logo=mongodb)
![Zod](https://img.shields.io/badge/Zod-4.x-purple)
![ImageKit](https://img.shields.io/badge/ImageKit-6.x-orange)
![Nodemailer](https://img.shields.io/badge/Nodemailer-7.x-yellow)
![EJS](https://img.shields.io/badge/EJS-3.x-red)
![JWT](https://img.shields.io/badge/JWT-9.x-lightgrey)

---

## 🌐 Live Server

**Deployment:**  
[https://kitsune-shop-server.vercel.app/](https://kitsune-shop-server.vercel.app/)

---

## ✨ Features

- 🛒 Cart management (add, update, remove, clear)
- 👤 User registration & login with email verification
- 🛡️ JWT authentication for users & admins
- 📦 Product CRUD with image upload (ImageKit)
- 📝 Product reviews (with rating & message)
- 📦 Order placement, confirmation, cancellation
- 📊 Admin dashboard stats (products, orders, revenue)
- 📧 Email notifications (Nodemailer)
- 🧪 Input validation (Zod)
- 🌐 RESTful API structure

---

## 🗂️ Project Structure

```
.env.local
index.js
package.json
config/
  db.js
  envConfig.js
  fileConfig.js
  imagekitConfig.js
  nodemailerConfig.js
controller/
  cartController.js
  orderController.js
  productController.js
  userController.js
middleware/
  adminAuth.js
  userAuth.js
model/
  cartModel.js
  orderModel.js
  productModel.js
  reviewModel.js
  userModel.js
public/
router/
  cartRouter.js
  orderRouter.js
  productRouter.js
  userRouter.js
validators/
  productValidator.js
  userValidator.js
views/
  emailVerificationTemplate.ejs
  verificationError.ejs
  verificationSuccess.ejs
```

---

## 🔑 Environment Variables (`.env.local`)

| Variable                | Description                       |
|-------------------------|-----------------------------------|
| `PORT`                  | Server port (default: 8080)       |
| `SERVER_URL`            | Backend base URL                  |
| `DB_URL`                | MongoDB connection string         |
| `USER_JWT_KEY`          | JWT secret for users              |
| `ADMIN_JWT_KEY`         | JWT secret for admins             |
| `NODEMAILER_EMAIL`      | Gmail address for emails          |
| `NODEMAILER_PASSWORD`   | Gmail app password                |
| `IMAGEKIT_PUBLIC_KEY`   | ImageKit public key               |
| `IMAGEKIT_PRIVATE_KEY`  | ImageKit private key              |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint             |
| `CLIENT_BASE_URL`       | Frontend base URL                 |

---

## 🧩 Models Overview

### [`model/userModel.js`](model/userModel.js)
- `name`: String, required
- `email`: String, required, unique
- `password`: String, required (hashed)

### [`model/productModel.js`](model/productModel.js)
- `name`: String, required
- `category`: Enum, required
- `productUrl`: String, required
- `offerPrice`: Number, required
- `price`: Number, required
- `description`: String, required
- `isVisible`: Boolean, default true

### [`model/cartModel.js`](model/cartModel.js)
- `userId`: ObjectId, required
- `productId`: ObjectId, required
- `size`: String, required
- `quantity`: Number, required (1-9)

### [`model/orderModel.js`](model/orderModel.js)
- `userId`: ObjectId, required
- `userName`: String, required
- `userContact`: Number, required
- `userEmail`: String, required
- `items`: Array of products (with size, quantity, price, etc.)
- `amount`: Number, required
- `address`: Object (street, city, state, country, zipcode)
- `status`: Enum (pending, cancelled, confirmed)
- `date`: Date

### [`model/reviewModel.js`](model/reviewModel.js)
- `productId`: ObjectId, required
- `userId`: ObjectId, required
- `userName`: String, required
- `rating`: Number (1-5), required
- `message`: String, required (min 10 chars)

---

## 🚀 Getting Started

1. **Clone the repo**
   ```sh
   git clone https://github.com/yourusername/kitsune-shop.git
   cd kitsune-shop/backend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment**
   - Copy `.env.local` and fill in your secrets.

4. **Run the server**
   ```sh
   npm run dev
   # or
   npm start
   ```

5. **API Endpoints**
   - See routers: [`router/productRouter.js`](router/productRouter.js), [`router/userRouter.js`](router/userRouter.js), [`router/cartRouter.js`](router/cartRouter.js), [`router/orderRouter.js`](router/orderRouter.js)

---

## 🛠️ Tech Stack

- Node.js, Express.js
- MongoDB & Mongoose
- JWT for authentication
- Zod for validation
- ImageKit for image hosting
- Nodemailer for emails
- EJS for server-side views

---

## 📄 License

MIT

---

> Made with ❤️ by [Sahil Mane](https://github.com/sahilmaneweb)