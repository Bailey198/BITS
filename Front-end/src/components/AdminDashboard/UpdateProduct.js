import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


export const UpdateProduct = () => {
    const { register, setValue, handleSubmit, trigger, formState: { errors } } = useForm();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({});

    useEffect(() => {
        dispatch(actions.controlLoading(true))
        try {
            const getDetailProduct = async () => {
                const res = await requestApi(`/products/${params.id}`, 'GET', []) // requestApi(`/users/${params.id}`, 'GET', [])
                console.log("res =>", res)
               
                const fields = ['title', 'price', 'category', 'description', 'video', 'banner_img']
                fields.forEach((field) => { setValue(field, res.data[field]) })
                
                setProductData({...res.data, banner_img: process.env.REACT_APP_API_URL+'/'+ res.data.banner_img})
                
                dispatch(actions.controlLoading(false))
            }
            getDetailProduct()
        } catch (error) {
            console.log("error =>", error)
            dispatch(actions.controlLoading(false))
        }
    }, [])

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader()
            reader.onload = (e) => {
                setProductData({...productData, banner_img: reader.result})
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    // const handleUpdateImg = async () => {
    //     let formData = new FormData()
    //     formData.append('banner_img', updateImg.file)
    //     await requestApi(`/products/upload-img/${params.id}`, 'POST', formData, 'json', 'multipart/form-data').then(res => {
    //         console.log ('res =>', res)
    //     }).catch(err => {
    //         console.log ('err =>', err)
    //     })
    // }

    const handleSubmitFormUpdate = async (data) => {
        console.log('data form=>', data);
        let formData = new FormData()
        for(let key in data){
            if(key == 'banner_img'){
                if(data.banner_img[0] instanceof File){
                    formData.append(key, data[key][0])
                }
            }else {
                formData.append(key, data[key])
            }
        }
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`/products/${params.id}`, 'PUT', formData, 'json', 'multipart/form-data');
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Update product successfully!', { position: 'top-center', autoClose: 2000 })

            setTimeout(() => {
                navigate('/Admin/products')
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
                            <h3 className="h3 text-accent text-center">Update Product</h3>
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
                                    {...register('price', { required: 'Price is required!', valueAsNumber: true })}
                                    type="number"
                                    className="block border border-grey-light w-full p-3 rounded"
                                    placeholder="Price" />
                                {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                            </div>

                            <div className='mb-4'>
                                <input
                                    {...register('category', { required: 'Category is required!' })}
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded"
                                    placeholder="Category" />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Example: MMO, RPG, Horror...</p>
                                {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                            </div>

                            <div className='mb-4'>
                                <label><b>Description:</b></label>
                                <textarea rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 {...register('description', {required:"Description is required"})}/>
                                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

                            </div>

                            <div className='mb-4'>
                                <input
                                    {...register('video', { required: 'Video link is required!' })}
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded"
                                    placeholder="Video Link" />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Use Youtube video link.</p>
                                {errors.video && <p className='text-red-500'>{errors.video.message}</p>}
                            </div>

                            <div className='mb-4'>
                                {productData.banner_img && <img src={productData.banner_img} className='max-w-xs rounded border bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800' />
                                }
                                <label for="file_input"><b>Upload file</b></label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="file_input_help" id="file_input" type="file" name='banner_img' {...register('banner_img', {onChange: onImageChange})} accept='image/*' />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG.</p>
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
