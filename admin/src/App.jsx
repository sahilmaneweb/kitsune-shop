import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './components/Admin/AddProduct'
import ListProduct from './components/Admin/ListProduct'
import Aside from './components/Navbar/Aside'
import AllOrder from './components/Admin/AllOrder'

function App() {
  return (
    <div>
      <Navbar />
      <div className='flex gap-2'>
        <Aside />
        <div className='w-full mx-auto md:w-10/12'>
        <Routes>
        <Route path='/' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
        <Route path='/allorders' element={<AllOrder />} />
        </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
