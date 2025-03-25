import React, { useContext, useState } from 'react';
import person_icon from "../assets/person_icon.svg"
import mail_icon from "../assets/mail_icon.svg";
import lock_icon from "../assets/lock_icon.svg"
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate();
    const {backendUrl, setIsLoggedIn} = useContext(AppContext);

    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            
            axios.defaults.withCredentials = true;
            if(state === 'Sign Up') {
                const {data} = await axios.post(backendUrl + '/api/auth/signup', {name, email, password});
                if(data.success) {
                    setIsLoggedIn(true);
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            } else {
                const {data} = await axios.post(backendUrl + '/api/auth/login', { email, password});
                if(data.success) {
                    setIsLoggedIn(true);
                    console.log("Logged in successfully");
                    toast.success("Logged in successfully")
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
        <img onClick={() => navigate('/')} src="/resumeRingerLogo.png" alt="" className='absolute left-5 sm:left-20 top-5 w-20 sm:w-20 cursor-pointer' />
        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
            <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
            <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>
            <form onSubmit={onSubmitHandler}>
                {state === 'Sign Up' && (
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={person_icon} alt="" />
                    <input onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Full Name' className='bg-transparent outline-none' required />
                </div>
            )}
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={mail_icon} alt="" />
                    <input onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='Email id' className='bg-transparent outline-none' required />
                </div>
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={lock_icon} alt="" />
                    <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' className='bg-transparent outline-none' required />
                </div>
                <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password ?</p>
                <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer'>{state}</button>
            </form>
            {state === "Sign Up" ? (
                <p className='text-gray-400 text-center text-xs mt-4'>Already have an account ? {' '}
                    <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
                </p>
            ) : (
                <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account ? {' '}
                    <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
                </p>
            )}
        </div>
    </div>
  )
}

export default Login