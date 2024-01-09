import React, { useState,useContext } from 'react'
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './CartItem';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';
import './cart.css'

export const Cart = () => {
    const { productList, cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [btnDisable, setBtnDisable] = useState(false);

    const orderData = {orderTotal: totalAmount, address:'Hong Linh Plaza', status: 1}

    const handleSubmitOrder = async (data) => {
        
        dispatch(actions.controlLoading(true))
        setBtnDisable(true)
        try {
            const res = await requestApi('/orders', 'POST', data);
            console.log('res=>', res)
            dispatch(actions.controlLoading(false))
            toast.success('Your order has been received!', { position: 'top-center', autoClose: 2000 })
    
            setTimeout(() => {
                navigate('/')
                checkout();
                setBtnDisable(false)
            }, 2000);
    
        } catch (error) {
            console.log('error =>', error)
            dispatch(actions.controlLoading(false))
        }
    }

    return (
        <div className="cart">
            <div className='h2'>
                <h1>Your Cart Items</h1>
            </div>

            <div className="cart">
                {productList.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem data={product} />;
                    }
                })}
            </div>

            {totalAmount > 0 ? (
                <div className="checkout">
                    <p className='h2'> Subtotal : ${totalAmount} </p>
                    <button  onClick={() => navigate("/")}> Continue Shopping </button>
                    <button
                        disabled={btnDisable}
                        onClick={() => {
                            handleSubmitOrder(orderData);
                        }}
                    >
                        {" "}
                        Checkout{" "}
                    </button>
                </div>
            ) : (
                <h1> Your Shopping Cart is Empty</h1>
            )}
            <div className='h-[500px]'></div>
        </div>
    );
};
