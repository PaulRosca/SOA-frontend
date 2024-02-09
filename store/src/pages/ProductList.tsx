import React, { useContext, useEffect, useState } from "react";
import ProductComponent from "../components/Product";
import { CartContext } from "../context";
import { getProducts } from "../services";
import { Cart, Product } from "../types";

interface Props {
  isAdmin: boolean
}
export default function ProductList({ isAdmin }: Props) {
  const { setCart } = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then((prod) => {
      setProducts(prod);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  const addToCart = (productId: number, quantity: number) => {
    setCart((oldCart: Cart) => {
      const old = [...oldCart];
      const itemIndex = oldCart.findIndex((ci) => ci.productId === productId);
      if (itemIndex === -1) {
        old.push({ productId, quantity });
      } else {
        old[itemIndex].quantity += quantity;
      }
      return old;
    });
  };

  return (
    <div className="w-full p-10 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {
        products.map((product: Product) => {
          return (<ProductComponent key={`product-${product.id}`} {...product} addToCart={addToCart} isAdmin={isAdmin} />);
        })
      }
    </div>
  );
}
