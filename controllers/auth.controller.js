import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import generateToken from "../helpers/token-validation.js";
import axios from "axios";
import { response } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";

const signUpUser = async (req, res) => {
  try {
    const user = await registerUser(req, res);

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const signInUser = async (req, res) => {
  try {
    const user = await loginUser(req, res);

    res.status(200).json({
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

// const sendEmail = async (req, res) => {
//   const { user, email, subject, description } = req.body;

//   try {
//     transporter
//       .sendMail({
//         from: `"${user}" <${process.env.GMAIL_SECRET}> `,
//         to: email,
//         subject: `${subject} -> mensaje de prueba`,
//         text: "hello world",
//         html: `<b>de: </b> ${user}
//       <br><br>
//       <p>${description}</p> `,
//       })
//       .then(() => console.log("el mensaje se ha enviado correctamente"))
//       .catch((err) => console.log(err));

//     res.status(200).json({
//       msg: "Correo enviado correctamente",
//     });
//   } catch (error) {
//     res.status(400).json({
//       error,
//     });
//   }
// };

export { signInUser, signUpUser };
