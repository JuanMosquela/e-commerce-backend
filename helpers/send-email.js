import transporter from "../config/nodeMailer-config.js";
import path from "path";
import hbs from "nodemailer-express-handlebars";

const sendEmail = (user) => {
  let array = "";

  const cart = user.cart;

  let n;
  for (n in cart.items) {
    array += `<li>${cart.items[n].item.title} --- <span>${cart.items[
      n
    ].total.toFixed(2)}</span> x <span>${cart.items[n].quantity}</span> </li>`;
  }

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
        array,
        cart,
      },

      // html: `<h1>Thank you for your buy !</h1>
      //   <h2>Your order confirmation is below</h2>
      //   <br><br>
      //  <ul>
      //  ${array}
      //  <br>
      //  <li>$ ${cart.subTotal.toFixed(2)}</li>

      //  </ul>`,
    })
    .then(() => console.log("el mensaje se ha enviado correctamente"))
    .catch((err) => console.log(err));
};

export default sendEmail;
