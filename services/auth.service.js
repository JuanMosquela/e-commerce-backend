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

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate([
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

    return rest;
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export { registerUser, loginUser };
