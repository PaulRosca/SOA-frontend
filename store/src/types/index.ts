export interface Product {
  id: number,
  title: string
  category: string,
  description: string,
  price: string,
  stock: string,
}

export interface ProductComponent extends Product {
  addToCart: (productId: number, quantity: number) => void
}

export interface CartItem {
  productId: number,
  quantity: number
}

export type Cart = CartItem[];

export interface CarContextProps {
  cart: Cart,
  setCart: React.Dispatch<React.SetStateAction<Cart>>
}

export interface OrderProduct {
  id: number,
  quantity: number
}

export interface Order {
  email: string,
  address: string,
  products: OrderProduct[]
}
