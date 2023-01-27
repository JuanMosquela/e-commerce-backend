import axios from "axios";

export const getProducts = async () => {
  const { data } = await axios.get(
    "http://localhost:5000/api/products?category=zapatillas&branch=&min_price=&max_price="
  );

  return data;
};

export const getSingleProduct = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);

  return data;
};
