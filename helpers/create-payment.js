import mercadopago from "mercadopago";

const createPayment = async (res, products) => {
  const url = "https://api.mercadopago.com/checkout/preferences";

  let preference = {
    // payer: {
    //   name: "TETE1326257",
    //   email: "test_user_64012831@testuser.com",
    // },
    items: products,
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "/success",
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
