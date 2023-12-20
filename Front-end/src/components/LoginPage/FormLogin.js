import React, { useState } from 'react';
import Rain from '../../assets/Rain.mp4';
import Login from './Login';
import Register from './Register';

const FormLogin = () => {
    const [form, setForm] = useState('Login')
    const [isLogin, setIsLogin] = useState(true)
  return (
    <div className="relative">
        <video src={Rain} autoPlay loop muted />
        <div className="absolute absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Login background */}
            <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl text-white font-bold text-center mb-6">{form}</h1>

                {isLogin? 
                    <Login/>
                    :
                    <Register />
                }

                {/* Register */}
                {isLogin? 
                    <div className='flex justify-between'>
                        <p className="flex m-4">New here? 
                        <span className="flex text-blue-500 font-semibold mx-4 cursor-pointer"
                        onClick={() => {setIsLogin(false); setForm('Register')}}
                        > Create an Account</span></p>
                    </div>
                    : 
                    <div className='flex justify-end'>
                        <p className="flex text-blue-500 font-semibold mx-4 cursor-pointer"
                        onClick={() => {setIsLogin(true); setForm("Login")}}
                        > Login</p>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default FormLogin;
