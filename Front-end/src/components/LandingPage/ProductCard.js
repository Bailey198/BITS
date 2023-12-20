import React from 'react';
import gameImg from '../../assets/wibuImpact.png';
import { Link } from 'react-router-dom';

export const ProductCard = (props) => {
    const {data} = props;
  return (
    <div className="grow max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img className="rounded-t-lg" src={gameImg} alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h2 className="mb-2 h2 text-accent text-2xl font-bold tracking-tight dark:text-white">{data.title}</h2>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.description}</p>
            <Link to={`/detail-product/${data.id}`} className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white btn">
                More Detail
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>
    </div>
  )
}
