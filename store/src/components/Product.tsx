import React, { useEffect, useState } from "react";
import { catalogURL, getProductStock, updateProductStock } from "../services";
import { ProductComponent } from "../types";

export default function Product({ id, description, title, category, price, addToCart, isAdmin }: ProductComponent) {
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const updateStock = (stock: number) => {
    if (!isNaN(stock) && stock >= 0) {
      updateProductStock(id, stock).then(() => setStock(stock)).catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    getProductStock(id).then((stk) => {
      setStock(stk);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-between">
      <img
        className="w-60 h-60 object-contain p-8 rounded-t-lg"
        src={catalogURL + `/image/${id}`}
        alt="product image"
        crossOrigin="anonymous"
      />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <h6 className="font-semibold">{description}</h6>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xl font-bold text-white dark:text-white bg-gray-500 rounded px-2">{category}</span>
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{price}€</span>
        </div>
        {
          isAdmin ? (
            <div className="flex mt-2">
              <div className="relative flex items-center">
                <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" onClick={() => updateStock(stock - 1)}>
                  <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                  </svg>
                </button>
                <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required value={stock} onChange={(e) => updateStock(parseInt(e.target.value))} />
                <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" onClick={() => updateStock(stock + 1)}>
                  <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-1">
              <div>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => quantity ? setQuantity((oldQuantity) => oldQuantity - 1) : null}>-</button>
                <span className="mx-2">{quantity}</span>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setQuantity((oldQuantity) => oldQuantity + 1)}>+</button>
              </div>
              <a href="#" className="text-white ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => addToCart(id, quantity)}>Add to cart</a>
            </div >

          )
        }
      </div >
    </div >
  );
}
