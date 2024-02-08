import axios from "axios";
import { Order, Product } from "../types";

const baseURL = "http://localhost:9000";

export const catalogURL = baseURL + "/catalog";
export const orderURL = baseURL + "/orders";

export const placeOrder = async (order: Order): Promise<void> => {
  const response = await axios.post(orderURL + "/", order, { withCredentials: true });
  return response.data;
};

export const getProducts = async (ids: number[] = []): Promise<Product[]> => {
  const response = await axios.get(catalogURL + "/", { params: { ids: ids.join(",") } });
  return response.data;
};

export const addProduct = async (product: Omit<Product, "id">, image: File): Promise<Product> => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("category", product.category);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  const response = await axios.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    withCredentials: true
  });
  return response.data;
};
