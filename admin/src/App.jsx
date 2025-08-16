import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './components/Admin/AdminLogin';
import Navbar from './components/Navbar/Navbar';
import Aside from './components/Navbar/Aside';
import AddProduct from './components/Admin/AddProduct';
import ListProduct from './components/Admin/ListProduct';
import AllOrder from './components/Admin/AllOrder';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Dashboard from './components/Admin/Dashboard';
import { Outlet } from 'react-router-dom'; // Import Outlet

// This is the correct way to define your layout
const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className='flex gap-2'>
        <Aside />
        <div className='w-full mx-auto md:w-10/12'>
          <Outlet /> {/* Renders the content of the nested route */}
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Routes>
      {/* Public route for the login page */}
      <Route path='/' element={<AdminLogin />} />

      {/* Protected routes wrapped in ProtectedRoute */}
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='listproduct' element={<ListProduct />} />
          <Route path='allorders' element={<AllOrder />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;