import mercadopago from "mercadopago";

const createPayment = async (res, products) => {
  const url = "https://api.mercadopago.com/checkout/preferences";

  let preference = {
    items: products,
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "/https://localhost:3000",
    },
    auto_return: "approved",
    binary_mode: true,
  };

  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });

  const { body } = await mercadopago.preferences
    .create(preference)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return res.status(400).json({
        error,
      });
    });

  return body;
};

export default createPayment;
