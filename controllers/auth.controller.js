import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import generateToken from "../helpers/token-validation.js";

const addUser = async (req, res) => {
  const { name, email, password, isAdmin, pictureURL, state } = req.body;

  try {
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

    user.save();

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

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
      ...rest,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export { addUser, login };
