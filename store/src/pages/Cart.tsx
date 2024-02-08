import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context";
import { catalogURL, getProducts, placeOrder } from "../services";
import { Order, Product } from "../types";

interface Props {
  user?: {
    email: string
  }
}

export default function Cart({ user }: Props) {
  const shipping = () => cart.length ? 4.99 : 0;
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>([]);
  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, cartItem) => acc + cartItem.quantity * parseFloat(products.find((p) => p.id === cartItem.productId)?.price || "0"),
      0
    );
  }, [cart, products]);

  const addQuantity = (productId: number, value: number) => {
    setCart((oldCart) => {
      const newCart = [...oldCart];
      const prod = newCart.find((ci) => ci.productId === productId);
      if (prod && prod.quantity + value >= 1) {
        prod.quantity += value;
      }
      return newCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((oldCart) => {
      return oldCart.filter((ci) => ci.productId !== productId);
    });
  };

  useEffect(() => {
    getProducts(cart.map((ci) => ci.productId))
      .then((list) => {
        setProducts(list);
      });
  }, []);

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const order: Order = {
      email,
      address: [street, city, country].join(","),
      products: cart.map((ci) => ({ id: ci.productId, quantity: ci.quantity }))
    };
    placeOrder(order).then(() => {
      setCart([]);
      navigate("/");
    }).catch((err) => console.log(err));
  };

  const [email, setEmail] = useState(user?.email || "");
  const [city, setCity] = useState("Cluj-Napoca");
  const [country, setCountry] = useState("Cluj");
  const [street, setStreet] = useState("Bd. 21 decembrie nr.15");

  return (
    <div className="h-full bg-gray-100 pt-10">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {
            cart.map((cartItem) => {
              const product = products.find((p) => p.id === cartItem.productId);
              return (
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" key={`item-${cartItem.productId}`}>
                  <img src={catalogURL + `/image/${product?.id}`} alt="product-image" className="w-60 h-60 object-contain rounded-lg" crossOrigin="anonymous" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">{product?.title}</h2>
                      <p className="mt-1 text-xs text-gray-700">{product?.description}</p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => addQuantity(cartItem.productId, -1)}> - </span>
                        <input className="h-8 w-12 border bg-white text-center text-xs outline-none" type="number" value={cartItem.quantity} disabled />
                        <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => addQuantity(cartItem.productId, 1)}> + </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">{product?.price}€</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => removeFromCart(cartItem.productId)}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">

          <form className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                  Email
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                  City
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-county">
                  County
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-county" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-street">
                  Street
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-street" value={street} onChange={(e) => setStreet(e.target.value)} />
              </div>
            </div>

          </form>


          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">
              {subtotal.toFixed(2)}€
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">{shipping()}€</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{(shipping() + subtotal).toFixed(2)}EUR</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" disabled={!cart.length} onClick={handlePlaceOrder}>Place order</button>
        </div>
      </div>
    </div>
  );
}
