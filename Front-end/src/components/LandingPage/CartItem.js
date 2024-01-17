import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, title, price, banner_img } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
  useContext(ShopContext);

  const productImg = process.env.REACT_APP_API_URL+'/'+ banner_img;

  return (
    <div className="flex justify-between cartItem relative">

      <img className="mx-10 rounded" src={productImg} />


      <div className="description flex">
        <div>
          <p className="h2 text-accent">
            <b>{title}</b>
          </p>
          <p> Price: ${price}</p>

          <div className="countHandler text-black absolute bottom-3 right-3">
          <button className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-3 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button className="ms-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg  px-2 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => addToCart(id)}> + </button>
        </div>
        </div>
      </div>

    </div>
  );
};