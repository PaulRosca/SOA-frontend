import React, { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../services";
import { ReturnOrder } from "../types";

interface Props {
  isAdmin: boolean
}
export default function Orders({ isAdmin }: Props) {
  const [orders, setOrders] = useState<ReturnOrder[]>([]);
  const updateStatus = (ordId: number, status: string) => {
    updateOrder(ordId, status);
    setOrders((ords) => {
      const newOrds = [...ords];
      const ord = newOrds.find((ord) => ord.id === ordId);
      if (ord) {
        ord.status = status;
      }
      return newOrds;
    });
  };
  useEffect(() => {
    getOrders().then((ords) => setOrders(ords)).catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex justify-center mt-5">
      {
        orders.map((ord) => {
          return (
            <div className="w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={ord.id}>
              <p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Order #{ord.id}</h5>
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Address: {ord.address}</p>
              <ul>
                {
                  ord.products.map((prod) => (
                    <li key={prod.id}>
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">
                          {prod.title}
                        </div>
                        <div>
                          {prod.description}
                        </div>
                        <div>
                          {prod.price}€
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className="flex justify-between items-center mt-2">
                {
                  isAdmin ? (
                    <select data-te-select-init value={ord.status} onChange={(e) => updateStatus(ord.id, e.target.value)}>
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                    </select>
                  ) : (
                    <div className={`rounded py-1 px-2 text-white ${ord.status === "processing" ? "bg-gray-500" : "bg-green-500"}`}>
                      {ord.status}
                    </div>
                  )
                }
                <div>
                  {ord.timestamp}
                </div>
              </div>
            </div>
          );
        })
      }
    </div >
  );
}
