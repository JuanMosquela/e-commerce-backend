import User from "../models/userSchema.js";

const findUserById = async (id) => {
  try {
    const user = await User.findById(id).populate([
      {
        path: "cart",
        populate: {
          path: "items",
          populate: {
            path: "item",
          },
        },
      },
      "orders",
      "products",
    ]);

    return user;
  } catch (error) {
    console.log(error);
  }
};

const findAllUsers = async () => {
  try {
    const users = await User.find({ state: true });

    return users;
  } catch (error) {
    console.log(error);
  }
};

const findUserByIdAndUpdate = async (req, id) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true }
    );

    return user;
  } catch (error) {
    console.log(error);
  }
};

const findUserByIdAndDelete = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(id, { state: false });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export {
  findUserById,
  findAllUsers,
  findUserByIdAndUpdate,
  findUserByIdAndDelete,
};
