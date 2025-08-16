import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
import { toast } from 'react-hot-toast';
import axios from 'axios';


function Home() {
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    try {
      var response = axios.post('/auth/login', { email: email, password: password });
      var token = response.data.token;

      localStorage.setItem('authToken', token);
      toast.success("Login successful!");
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='p-8 mx-auto shadow-xl rounded-sm bg-white w-full max-w-lg'>
        <h1 className='text-2xl border-b-2 pb-2 pl-2 shadow-sm text-red-600 font-bold'>Admin Login</h1>
        <form onSubmit={handleLogin} className='mt-6'>
          <div className='w-full px-3'>
            <label htmlFor="email" className='text-lg block my-2 text-red-600 font-semibold'>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={function(e){setEmail(e.target.value)}} 
              className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-md focus:outline-none focus:border-red-600' 
              required
            />
          </div>

          <div className='w-full px-3 mt-4'>
            <label htmlFor="password" className='text-lg block my-2 text-red-600 font-semibold'>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={function(e){setPassword(e.target.value)}} 
              className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-md focus:outline-none focus:border-red-600' 
              required
            />
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
    </div>
  );
}

export default Home;