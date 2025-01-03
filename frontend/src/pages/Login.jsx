import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setOrder, setCart } = useContext(ShopContext);
  const [state, setState] = useState('Login');
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    setState('Login');
  },[]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
    if(state == 'Login'){
      const data = {email,password};
      for(const item in data){
        if(data[item] == ""){
          toast.error(`Input fields should be filled`);
          return;
        }
      }
      const response = await axios.post("http://localhost:8080/user/loginUser",data,{headers: { 'Content-Type': 'application/json' }}).then((res)=> res.data).catch((err)=>{console.log(err);});
      console.log(response);
      if(response.success){
        setToken(response.token);
        localStorage.setItem("authToken", response.token);
        setCart(response.cart);
        setOrder(response.order);
        toast.success(response.message);
        navigate("/");
      }else{
        toast.error(resposne.message);
      }
      

    }else if(state == 'Register') {
      let data = {fname,lname,email,password};
      for(const item in data){
        if(data[item] == ""){
          toast.error(`Input fields should be filled`);
          return;
        }
      }
      data = {name: fname + " " + lname,email,password};
      const response =await axios.post("http://localhost:8080/user/registerUser",data,{headers: { 'Content-Type': 'application/json' }}).then((res)=> res.data).catch((err)=>{console.error(err)});
      console.log(response);
      if(response.success){
        setToken(response.token);
        setCart(response.cart);
        toast.success(response.message);
        navigate("/");
      }else{
        toast.error(response.message)
      }

    }
  }catch(error){
    console.log(error);
    toast.error(error.message);
  }
  }

  return (
    <div className='px-4'>
      <form onSubmit={handleSubmit} className='border-2 rounded-md p-3 mx-auto max-w-[530px] shadow-md my-3'>
        <h1 className='text-2xl font-semibold pb-2 border-b-2'>{state}</h1>

        <section className={`grid grid-cols-2 gap-2 ${state == "Register" ? "grid" : "hidden"}`}>
          <div>
            <label htmlFor="fname" className='text-lg py-2 block'>First Name : </label>
            <input type="text" name="fname" id="fname" onChange={(e)=>setFname(e.target.value)} className='border-2 w-full rounded-md focus:outline-none focus:ring-2 p-1 text-[16px] focus:ring-red-300' />
          </div>
          <div>
            <label htmlFor="lname" className='text-lg py-2 block'>Last Name : </label>
            <input type="text" name="lname" id="lname" onChange={(e)=>setLname(e.target.value)} className='border-2 w-full rounded-md focus:outline-none focus:ring-2 p-1 text-[16px] focus:ring-red-300' />
          </div>
        </section>

          <div>
            <label htmlFor="email" className='text-lg py-2 block'>Email : </label>
            <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} className='border-2 w-full rounded-md focus:outline-none focus:ring-2 p-1 text-[16px] focus:ring-red-300' />
          </div>
          <div>
            <label htmlFor="password" className='text-lg py-2 block'>Password : </label>
            <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} className='border-2 w-full rounded-md focus:outline-none focus:ring-2 p-1 text-[16px] focus:ring-red-300' />
          </div>
          <div className='flex gap-2 items-start py-2'>
            <input type="checkbox" defaultChecked name="agrre" id="agree" className='mt-2 accent-red-500 block' />
            <label htmlFor="agree">I agree to all Terms & Conditions by Kitsune Mechandise Ltd</label>
          </div>
          <button className='block w-full p-2 bg-red-500 rounded-md my-4 text-lg font-semibold text-white hover:bg-red-600'>
            {state} Now
          </button>
          <div>
            {
              state == 'Login' ? (
                <p>If don't have account, then <span className='text-red-600 cursor-pointer font-semibold' onClick={()=>setState('Register')}>Register</span> here </p>
              ) : (<p>If you have account, then <span className='text-red-600 cursor-pointer font-semibold' onClick={()=>setState('Login')}>Login</span> here</p>)
            }
          </div>
      </form>
    </div>
  )
}

export default Login