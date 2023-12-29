import React, { createContext, useState, useEffect } from 'react'
import requestApi from '../helpers/api'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {}
  for (let i = 1; i < 100; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    requestApi('/products', 'GET', []).then(response => {
      setProductList(response.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = productList.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalQuantity = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        totalQuantity += cartItems[key];
      }
    }
    return totalQuantity;
  }

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = { cartItems, productList, getTotalCartAmount, getTotalCartItems, addToCart, removeFromCart, updateCartItemCount, checkout }

  return (
    <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
  )
}
