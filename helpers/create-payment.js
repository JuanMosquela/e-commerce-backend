import mercadopago from "mercadopago";

const createPayment = async (products) => {
  const url = "https://api.mercadopago.com/checkout/preferences";

  let preference = {
    items: products,
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "http://localhost:3000",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });

  const { body } = await mercadopago.preferences.create(preference);

  return body;
};

export default createPayment;
