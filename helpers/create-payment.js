import axios from "axios";

const createPayment = async (products) => {
  const url = "https://api.mercadopago.com/checkout/preferences";

  const body = {
    payer: {
      name: "TETE1326257",
      email: "test_user_64012831@testuser.com",
    },
    items: products,
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "/success",
    },
  };

  const { data } = await axios.post(url, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  return data;
};

export default createPayment;
