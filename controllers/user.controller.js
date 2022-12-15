import User from "../models/userSchema.js";

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        msg: `The user with the id: ${id} dont exist `,
      });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      user: rest,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ state: true });

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  const { name, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
    });

    const updatedUser = await user.save();

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      user: rest,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await User.findByIdAndUpdate(id, { state: false });
    res.status(200).json({
      msg: "User has been deleted",
      usuario,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const getUserFavorites = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({
        msg: "No se encontro el usuario",
      });
    }

    const favProducts = user.favorites;

    res.status(200).json({
      result: favProducts,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export { getUser, getAllUsers, updateUser, removeUser, getUserFavorites };
