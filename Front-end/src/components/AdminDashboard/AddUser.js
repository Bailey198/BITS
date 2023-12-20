import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';

export const AddUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitFormAdd = async (data) => {
        console.log('data form', data);
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi('/users', 'POST', data);
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Add new user successfully!', { position: 'top-center', autoClose: 2000 })

            setTimeout(() => {
                navigate('/Admin/customers')
            }, 3000);

        } catch (error) {
            console.log('error =>', error)
            dispatch(actions.controlLoading(false))
        }
    }



    return (
        <div>
            {/*Breadcrumb*/}
            <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to='/Admin' className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <Link to='/Admin/customers' className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Customers Account
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                Add User
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>

            {/* Create Form */}
            <div className="bg-grey-lighter mt-4 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <form>
                            <h3 className="h3 text-accent text-center">Add New User</h3>
                            <div className='mb-4'>
                                <input
                                    {...register('firstName', { required: 'First name is required!' })}
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded"
                                    placeholder="First Name" />
                                {errors.firstName && <p className='text-red-500'>{errors.firstName.message}</p>}
                            </div>

                            <div className='mb-4'>
                                <input
                                    {...register('lastName', { required: 'Last name is required!' })}
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded "
                                    placeholder="Last Name" />
                                {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}

                            </div>

                            <div className='mb-4'>
                                <input
                                    {...register('email', {
                                        required: 'Email is required!',
                                        pattern: {
                                            value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                            message: 'Invalid Email Address!'
                                        }
                                    })}
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded"
                                    placeholder="Email" />
                                {errors.email && <p className='text-red-800'>{errors.email.message}</p>}
                            </div>


                            <div className='mb-4'>
                                <input
                                    {...register('password', { required: 'Password is required!' })}
                                    type="password"
                                    className="block border border-grey-light w-full p-3 rounded"
                                    placeholder="Password" />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                            </div>

                            {/* <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password" /> */}

                            <button
                                type='button'
                                className="btn p-3 text-center w-full"
                                onClick={handleSubmit(handleSubmitFormAdd)}
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
