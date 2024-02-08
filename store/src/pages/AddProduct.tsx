import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services";
import { Product } from "../types";

export default function AddProduct() {
  const [form, setForm] = useState<Omit<Product, "id">>({
    title: "",
    description: "",
    category: "",
    price: "0",
    stock: "0"
  });

  const [image, setImage] = useState<File | null>(null);


  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddProduct = (e: any) => {
    e.preventDefault();
    if(image) {
      addProduct(form, image).then(() => {
        navigate("/");
      }).catch((err) => {
        console.log("Error", err);
      });
    }
  };
  return (
    <div className="w-full flex p-5 justify-center mt-20">
      <div className="w-1/2">
        <h1 className="mb-10 text-xl">Add Product</h1>
        <form onSubmit={handleAddProduct}>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={form.title}
              onChange={(e) => setForm((oldForm) => {
                return {
                  ...oldForm,
                  title: e.target.value
                };
              })} />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={form.description}
              onChange={(e) => setForm((oldForm) => {
                return {
                  ...oldForm,
                  description: e.target.value
                };
              })}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <input
              type="text"
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={form.category}
              onChange={(e) => setForm((oldForm) => {
                return {
                  ...oldForm,
                  category: e.target.value
                };
              })}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
            <input
              type="number"
              id="stock"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={form.stock}
              onChange={(e) => setForm((oldForm) => {
                return {
                  ...oldForm,
                  stock: e.target.value
                };
              })}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={form.price}
              onChange={(e) => setForm((oldForm) => {
                return {
                  ...oldForm,
                  price: e.target.value
                };
              })}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Image</label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input"
              type="file"
              onChange={async(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setImage(file);
              }}
            />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
        </form>
      </div>
    </div>
  );
}
