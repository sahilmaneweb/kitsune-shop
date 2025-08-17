import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useShopContext();
  const [state, setState] = useState('Login');
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Login') {
        if (!email || !password) {
          toast.error("Email and password fields should be filled.");
          return;
        }
        const result = await login(email, password);
        
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
          setEmail('');
          setPassword('');
        }
      } else if (state === 'Register') {
        if (!fname || !lname || !email || !password) {
          toast.error("All input fields should be filled.");
          return;
        }
        const data = { name: `${fname} ${lname}`, email, password };
        const response = await api.post("/user/registerUser", data);

        if (response.data.success) {
          toast.success(response.data.message || "Registration successful! Please check your email for verification.");
          setEmail('');
          setPassword('');
          setFname('');
          setLname('');
          setState('Login');
        } else {
          toast.error(response.data.message || "Registration failed.");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
      
      // Clear input fields on any error
      setEmail('');
      setPassword('');
      setFname('');
      setLname('');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <form onSubmit={handleSubmit} className='border-2 border-red-300 rounded-md p-6 mx-auto w-full max-w-md shadow-lg bg-white'>
        <h1 className='text-3xl font-bold pb-3 border-b-2 border-red-400 mb-6 text-red-600 text-center'>{state}</h1>

        <section className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${state === "Register" ? "grid" : "hidden"}`}>
          <div>
            <label htmlFor="fname" className='text-lg py-2 block text-gray-700 font-semibold'>First Name : </label>
            <input type="text" name="fname" id="fname" value={fname} onChange={(e) => setFname(e.target.value)} className='border-2 w-full rounded-md focus:outline-none focus:ring-2 p-2 text-[16px] focus:ring-red-300' autoComplete="given-name" />
          </div>
          <div>
            <label htmlFor="lname" className='text-lg py-2 block text-gray-700 font-semibold'>Last Name : </label>
            <input type="text" name="lname" id="lname" value={lname} onChange={(e) => setLname(e.target.value)} className='border-2 w-full rounded-md focus:outline-none focus:ring-2 p-2 text-[16px] focus:ring-red-300' autoComplete="family-name" />
          </div>
        </section>

        <div className='mt-4'>
          <label htmlFor="email" className='text-lg py-2 block text-gray-700 font-semibold'>Email : </label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 w-full rounded-md focus:outline-none focus:ring-2 p-2 text-[16px] focus:ring-red-300' autoComplete="email" />
        </div>
        <div className='mt-4'>
          <label htmlFor="password" className='text-lg py-2 block text-gray-700 font-semibold'>Password : </label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 w-full rounded-md focus:outline-none focus:ring-2 p-2 text-[16px] focus:ring-red-300' autoComplete={state === 'Login' ? 'current-password' : 'new-password'} />
        </div>
        
        {state === 'Register' && (
          <div className='flex gap-2 items-start py-2 mt-2'>
            <input type="checkbox" defaultChecked name="agree" id="agree" className='mt-2 accent-red-500 block size-4' required />
            <label htmlFor="agree" className='text-sm text-gray-600'>I agree to all Terms & Conditions by Kitsune Merchandise Ltd</label>
          </div>
        )}

        <button type="submit" className='block w-full p-3 bg-red-600 rounded-md my-6 text-lg font-semibold text-white hover:bg-red-700 transition-colors duration-200'>
          {state} Now
        </button>

        <div className='text-center text-gray-700'>
          {state === 'Login' ? (
            <p>If you don't have an account, then <span className='text-red-600 cursor-pointer font-semibold hover:underline' onClick={() => setState('Register')}>Register here</span></p>
          ) : (
            <p>If you have an account, then <span className='text-red-600 cursor-pointer font-semibold hover:underline' onClick={() => setState('Login')}>Login here</span></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;