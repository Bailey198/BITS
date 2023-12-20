import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';


export const UpdateProduct = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const getDetailProduct = async () => {
                const res = await requestApi(`/products/${params.id}`, 'GET', []) // requestApi(`/users/${params.id}`, 'GET', [])
                console.log("res =>", res)
                dispatch(actions.controlLoading(false))

                const fields = ['title', 'description', 'price']
                fields.forEach((field) => { setValue(field, res.data[field]) })
            }
            getDetailProduct()
        } catch (error) {
            console.log("error =>", error)
            dispatch(actions.controlLoading(false))
        }
    }, [])

    const handleSubmitFormUpdate = async (data) => {
        console.log(data);
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/products/${params.id}`, 'PUT', data)
            console.log('res => ', res)
            dispatch(actions.controlLoading(false))
            toast.success('User has been Updated successfully!', { position: 'top-center', autoClose: 2000 })
            setTimeout(() => navigate('/Admin/products'), 3000);
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
                            <Link to='/Admin/products' className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Products Management
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                                Update Product
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
                            <h3 className="h3 text-accent text-center">Add New Product</h3>
                            <div className='mb-4'>
                                <input
                                    {...register('title', { required: 'Title is required!' })}
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded"
                                    placeholder="Title" />
                                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                            </div>

                            <div className='mb-4'>
                                <input
                                    {...register('description', { required: 'Description is required!' })}
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded "
                                    placeholder="Description" />
                                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

                            </div>

                            <div className='mb-4'>
                                <input
                                    {...register('price', { required: 'Price is required!', valueAsNumber: true })}
                                    type="number"
                                    className="block border border-grey-light w-full p-3 rounded"
                                    placeholder="Price" />
                                {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                            </div>

                            <button
                                type='button'
                                className="btn p-3 text-center w-full"
                                onClick={handleSubmit(handleSubmitFormUpdate)}
                            >
                                Update Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
