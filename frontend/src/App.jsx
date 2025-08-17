import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Collection from './pages/Collection';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import UserOrder from './pages/UserOrder';

// The MainLayout component is defined here
const MainLayout = () => {
  return (
    <div className='container mx-auto'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/collection/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/myorder' element={<UserOrder />} />
      </Route>
      {/* Add other routes outside the layout here if needed */}
    </Routes>
  );
};

export default App;