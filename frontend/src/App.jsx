import Footer from './components/Footer'
import Navbar from './components/Navbar'
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Collection from './pages/Collection'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import React from 'react'
import { Route, Routes } from 'react-router'
import UserOrder from './pages/UserOrder'

const App = () => {

  return (
    <div className='container mx-auto'>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/collection/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/myorder' element={<UserOrder />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App