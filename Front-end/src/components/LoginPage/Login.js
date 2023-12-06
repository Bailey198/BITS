import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';

import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from 'react-icons/ai';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);

    const onChange = (event) => {
        const target = event.target;
        setLoginData({
            ...loginData, [target.name]: target.value
        })
    }

    const validateForm = () => {
        let isValid = true;
        const errors = {};
        if (loginData.email === '' || loginData.email === undefined) {
            errors.email = 'Please enter email';
        } else {
            let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData.email);
            if (!valid) {
                errors.email = 'Email is not valid'
            }
        }

        if (loginData.password === '' || loginData.password === undefined) {
            errors.password = 'Please enter password';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            isValid = false;
        } else {
            setFormErrors({});
        }

        return isValid;
    }

    const onSubmit = () => {
        console.log(loginData);
        let valid = validateForm();
        if (valid) {
            console.log('Request login api')
            dispatch(actions.controlLoading(true));
            requestApi('/auth/login', 'POST', loginData).then((res) => {
                console.log(res)
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                dispatch(actions.controlLoading(false));
                navigate('/')
            }).catch((err) => {
                dispatch(actions.controlLoading(false));
                console.log(err)
                if (typeof err.response !== "undefined") {
                    if (err.response.status !== 201) {
                        toast.error(err.response.data.message, { position: "top-center" });
                    }
                } else {
                    toast.error("Sever is down. Please try again!", { position: "top-center" });
                }
            })
        }
        setIsSubmited(true);
    }

    useEffect(() => {
        if(isSubmited) {
            validateForm()
        }
    }, [loginData])



    return (
        <div>
            {/* Login Form */}
            <form>
                <div className="relative my-4">
                    <input type="email" className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                        placeholder=""
                        name='email'
                        onChange={onChange}
                    />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Your Email:
                    </label>
                    <BiUser className="absolute top-4 right-4" />
                    {formErrors.email && <p className='text-center' style={{ color: 'red',backgroundColor: "gray"}}>{formErrors.email}</p>}
                </div>
                <div className="relative my-4">
                    <input type="password" className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none 
                            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                        placeholder=""
                        name='password'
                        onChange={onChange} />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Your Password:
                    </label>
                    <AiOutlineUnlock className="absolute top-4 right-4" />
                    {formErrors.password && <p className='text-center' style={{ color: 'red',backgroundColor: "gray" }}>{formErrors.password}</p>}
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="Remember Me">Remember Me</label>
                    </div>
                    <Link to="" className="text-blue-500">Forgot Password?</Link>
                </div>

                {/* Login Button */}
                <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
                    type="button"
                    onClick={onSubmit}
                >
                    Login
                </button>

            </form>
        </div>
    );
};

export default Login;

