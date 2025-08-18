# 🦊 Kitsune Shop Frontend

Welcome to **Kitsune Shop** – a modern anime merchandise e-commerce site built with React, Vite, and TailwindCSS! 🚀

## 🌐 Live Deployment
Check out the live site here: [kitsune-shop-five.vercel.app](https://kitsune-shop-five.vercel.app/)

## ✨ Features

- 🛍️ Browse anime-themed shirts, hats, and tees
- 📦 Add to cart, checkout, and view your orders
- 🔒 User authentication (login/register)
- 🖼️ Product details with image slider & reviews
- 📱 Responsive, modern UI
- 🔔 Toast notifications & SweetAlert2 feedback
- 📰 Newsletter subscription (UI only)
- ⚡ Fast API integration via Axios

## 🛠️ Tech Stack

- ⚛️ React 18
- ⚡ Vite
- 🎨 TailwindCSS
- 🔗 Axios
- 🧭 React Router
- 🍬 SweetAlert2
- 🌀 Swiper (image slider)
- 🛡️ Zod (form validation)
- 🧹 ESLint

## 📦 Installation

1. **Clone the repository:**
	 ```sh
	 git clone <your-repo-url>
	 cd frontend
	 ```

2. **Install dependencies:**
	 ```sh
	 npm install
	 ```

3. **Set up environment variables:**
	 - Create a `.env` file in the root directory.
	 - Add:
		 ```env
		 VITE_SERVER_URL=<your-backend-api-url>
		 ```
	 - Example:
		 ```env
		 VITE_SERVER_URL=https://kitsune-backend.example.com/api
		 ```

## 🚦 Usage

- **Start development server:**
	```sh
	npm run dev
	```
	App runs at `http://localhost:5173` (default Vite port).

- **Build for production:**
	```sh
	npm run build
	```

- **Preview production build:**
	```sh
	npm run preview
	```

- **Lint code:**
	```sh
	npm run lint
	```

## 🚀 Deployment

Deploy easily on platforms like **Vercel**, **Netlify**, or **GitHub Pages**!

### Vercel/Netlify Steps
1. Push your code to GitHub.
2. Connect your repo to Vercel/Netlify.
3. Set the env variable `VITE_SERVER_URL` in the dashboard.
4. Build & deploy! 🎉

## 🔑 Environment Variables

- `VITE_SERVER_URL`: Base URL of your backend API (**required**)

## 📁 Folder Structure

- `src/components` – Navbar, Footer, ProductCard, etc.
- `src/pages` – Home, Collection, ProductDetails, Cart, Checkout, Login, UserOrder, About
- `src/context` – Global state (ShopContext)
- `src/services` – API service (Axios)
- `src/assets` – Images & product data
- `src/validators` – Zod validation schemas

## 🔌 API Integration

All API requests use the base URL from `VITE_SERVER_URL`. User tokens are stored in `localStorage` and attached to protected routes automatically.

## 🎨 Customization

- Update images in `src/assets` and `public`
- Adjust styles in `src/App.css` and `src/index.css`

## 📝 License

MIT

---
Made with ❤️ by [Sahil Mane](https://github.com/sahilmaneweb)
GitHub: [https://github.com/sahilmaneweb](https://github.com/sahilmaneweb)
