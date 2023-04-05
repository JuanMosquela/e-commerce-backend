import bcrypt from "bcrypt";
import generateToken from "../helpers/token-validation.js";
import User from "../models/userSchema.js";

import { loginUser } from "../services/auth.service.js";

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(401).json({ msg: "This user already exist" });
    }

    //encriptar la contraseña y guardarlo en db
    const salt = bcrypt.genSaltSync();
    const hashed_password = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashed_password,
    });

    await user.save();

    const token = generateToken(user.id);
    console.log(token);

    console.log(user);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await loginUser(email);

    if (!user.state) {
      return res.status(400).json({ msg: "This user has been deleted" });
    }

    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    //Comparar password con la password encriptada

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      user: rest,
      token: generateToken(user.id),
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
