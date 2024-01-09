import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import { Link } from 'react-router-dom';

export const ProductCard = (props) => {
    const { data } = props;
    const { addToCart, cartItems } = useContext(ShopContext);
    const cardImg = process.env.REACT_APP_API_URL + '/' + data.banner_img

    const cartItemAmount = cartItems[data.id]
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <Link to={`/detail-product/${data.id}`}>
                <img className="rounded-t-lg" src={cardImg} alt="" />
            </Link>
            <div className="p-5">
                <div className='flex justify-between'>
                    
                    <h2 className="mb-2 h2 text-accent text-2xl font-bold tracking-tight dark:text-white">{data.title}</h2>
                    <h2 className='h2 text-accent font-bold'>${data.price}</h2>
                </div>
                                
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {data.category}
                </div>

                <div className='flex justify-between mt-auto'>
                    <Link to={`/detail-product/${data.id}`} className="flex mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white btn">
                        More Detail
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    <button onClick={() => addToCart(data.id)} className='flex mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white btn' >Add to Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}</button>
                </div>
            </div>
        </div>
    )
}
