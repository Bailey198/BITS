import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './CartItem';
import { useNavigate } from "react-router-dom";
import './cart.css'

export const Cart = () => {
    const { productList, cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const navigate = useNavigate();

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
                        onClick={() => {
                            checkout();
                            navigate("/checkout");
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
