import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import generateToken from "../helpers/token-validation.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, pictureURL, state } = req.body;
    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      return res.status(401).json({ msg: "This user already exist" });
    }

    const user = new User({
      name,
      email,
      password,
      isAdmin,
      pictureURL,
      state,
    });

    //encriptar la contraseña y guardarlo en db
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    return user;
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const loginUser = async (email) => {
  try {
    const user = await User.findOne({ email }).populate([
      "orders",
      {
        path: "cart",
        populate: {
          path: "items",
          populate: {
            path: "item",
          },
        },
      },
    ]);

    return user;
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export { registerUser, loginUser };
