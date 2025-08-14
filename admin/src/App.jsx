import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './components/Admin/AddProduct';
import ListProduct from './components/Admin/ListProduct';
import AllOrder from './components/Admin/AllOrder';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import Aside from './components/Navbar/Aside';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <div>
      <AuthProvider>
      <Routes>
        {/* Public route for the login page */}
        <Route path='/' element={<AdminLogin />} />

        {/* Protected routes for the admin dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={
            <>
              <Navbar />
              <div className='flex gap-2'>
                <Aside />
                <div className='w-full mx-auto md:w-10/12'>
                  <Routes>
                    <Route path='/addproduct' element={<AddProduct />} /> {/* Default path for dashboard */}
                    <Route path='/listproduct' element={<ListProduct />} />
                    <Route path='/allorders' element={<AllOrder />} />
                  </Routes>
                </div>
              </div>
            </>
          } />
        </Route>

        {/* You may want to add a catch-all route for 404 errors */}
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;