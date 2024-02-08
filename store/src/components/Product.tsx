import React, { useState } from "react";
import { catalogURL } from "../services";
import { ProductComponent } from "../types";

export default function Product({ id, description, title, category, price, addToCart }: ProductComponent) {
  const [quantity, setQuantity] = useState(1);
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
        <div className="flex items-center justify-between mt-1">
          <div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => quantity ? setQuantity((oldQuantity) => oldQuantity - 1) : null}>-</button>
            <span className="mx-2">{quantity}</span>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setQuantity((oldQuantity) => oldQuantity + 1)}>+</button>
          </div>
          <a href="#" className="text-white ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => addToCart(id, quantity)}>Add to cart</a>
        </div>
      </div>
    </div>
  );
}
