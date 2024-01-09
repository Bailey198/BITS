import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';

const Register = (props) => {
    const {setForm, setIsLogin} = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitFormAdd = async (data) => {
        console.log('data form', data);
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/auth/register', 'POST', data);
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Creat Account Successfully!', { position: 'top-center', autoClose: 2000 })

            setTimeout(() => {
                setForm('Login')
                setIsLogin(true)
            }, 2000);

        } catch (error) {
            console.log('error =>', error)
            dispatch(actions.controlLoading(false))
        }
    }

    return (
        <div>
            {/* Register Form */}
            <form>
                <div className="relative my-4">
                    <input 
                    {...register('firstName', { required: 'First name is required!' })}
                    type="text"
                    className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                    placeholder="" />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        First Name:
                    </label>

                    {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
                </div>
                <div className="relative my-4">
                    <input 
                    {...register('lastName', { required: 'Last name is required!' })}
                    type="text"
                    className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                    placeholder="" />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Last Name:
                    </label>
                    {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
                </div>
                <div className="relative my-4">
                    <input 
                    {...register('email', {
                        required: 'Email is required!',
                        pattern: {
                            value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                            message: 'Invalid Email Address!'
                        }
                    })}
                    type="text"
                    className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                    placeholder="" />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter Email:
                    </label>
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="relative my-4">
                    <input 
                    {...register('password', { required: 'Password is required!' })}
                    type="password"
                    className="block w-72 py-3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none 
                            dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer"
                    placeholder="" />
                    <label htmlFor="" className="absolute text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                            peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Enter Password:
                    </label>

                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>

                {/* Register Button */}
                <button 
                className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
                onClick={handleSubmit(handleSubmitFormAdd)}
                type="button"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register;
