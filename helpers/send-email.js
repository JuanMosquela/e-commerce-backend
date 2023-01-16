import transporter from "../config/nodeMailer-config.js";
import path from "path";
import hbs from "nodemailer-express-handlebars";

const sendEmail = (user, order_id) => {
  // let array = "";

  const cart_data = user.cart.items.map((product) => {
    return {
      title: product.item.title,
      picture: product.item.pictureURL[0],
      amount: product.quantity,
      price: product.total,
      order_id,
    };
  });

  const handleBarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("../views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handleBarOptions));

  transporter
    .sendMail({
      from: `"Physical Point" <${process.env.GMAIL_SECRET}> `,
      to: user.email,
      subject: `Order Confirmation - Physical Point`,
      template: "order",
      context: {
        title: "Thank you for your purchase !",
        sub_title:
          "Your order confirmation as been recived and is now being processed. Your order confirmation is below",

        cart: cart_data,
        order_id,
      },
    })
    .then(() => console.log("el mensaje se ha enviado correctamente"))
    .catch((err) => console.log(err));
};

export default sendEmail;
