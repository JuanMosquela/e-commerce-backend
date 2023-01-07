import mercadopago from "mercadopago";
import "dotenv/config.js";

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

export default mercadopago;
