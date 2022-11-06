import User from "../models/userSchema.js";

const getUser = async (req, res) => {
  const { id } = req.params;
  const { authenticatedUser } = req.user;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        msg: `The user with the id: ${id} dont exist `,
      });
    }

    const { password, ...rest } = user;

    res.status(200).json({
      rest,
      authenticatedUser,
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

  const { name, email, pictureURL, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password,
      pictureURL,
    });

    const { password, ...rest } = user;

    res.status(200).json({
      ...rest,
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

export { getUser, getAllUsers, updateUser, removeUser };
