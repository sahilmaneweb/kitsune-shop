import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthProvider';
import { Eye, EyeOff } from 'lucide-react'; 
import { adminLoginValidatorFrontend } from '../../validators/adminFrontendValidators';


function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    
    const validationResult = adminLoginValidatorFrontend.safeParse({ email, password });
    
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      toast.error("Please correct the form errors.");
      return;
    }
    
    const result = await loginAdmin(email, password);
    
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-8 mx-auto shadow-xl rounded-sm bg-white w-full max-w-lg'>
        <h1 className='text-2xl border-b-2 pb-2 pl-2 shadow-sm text-red-600 font-bold'>Admin Login</h1>
        <form onSubmit={handleLogin} className='mt-6' autoComplete="off">
          <div className='w-full px-3'>
            <label htmlFor="email" className='text-lg block my-2 text-red-600 font-semibold'>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-md focus:outline-none focus:border-red-600' 
              required
              autoComplete="email" 
            />
            {errors.email && errors.email.map((err, index) => <p key={index} className="text-red-500 text-sm mt-1">{err}</p>)}
          </div>

          <div className='w-full px-3 mt-4'>
            <label htmlFor="password" className='text-lg block my-2 text-red-600 font-semibold'>Password</label>
            <div className='relative'>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-md focus:outline-none focus:border-red-600 pr-10' 
                required
                autoComplete="current-password" 
              />
              <span 
                className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && errors.password.map((err, index) => <p key={index} className="text-red-500 text-sm mt-1">{err}</p>)}
          </div>

          <section className='px-3 mt-6'>
            <button 
              type="submit" 
              className='inline-block text-lg py-2 w-full border-2 rounded-lg bg-red-600 text-white font-semibold outline-none hover:bg-red-700 transition-colors'
            >
              Sign In
            </button>
          </section>
        </form>
      </div>
      <footer className="fixed bottom-0 w-full text-center py-4 text-sm text-red-600">
        <p>Copyrights owned by Kitsune Store &copy; 2025</p>
        <p>Made with ❤️ by Sahil Mane</p>
      </footer>
    </div>
  );
}

export default AdminLogin;