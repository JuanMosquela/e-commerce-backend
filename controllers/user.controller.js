import cloudinary from "../config/cloudinary-config.js";
import User from "../models/userSchema.js";
import {
  findAllUsers,
  findUserById,
  findUserByIdAndDelete,
  findUserByIdAndUpdate,
} from "../services/user.service.js";

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findUserById(id);

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
    const users = findAllUsers();

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

  try {
    const user = await findUserByIdAndUpdate(req, id);

    if (req.files) {
      if (user.picture) {
        const fileArray = user.picture[0].split("/");
        const fileName = fileArray[fileArray.length - 1];
        const [public_id] = fileName.split(".");
        cloudinary.uploader.destroy(public_id);
      }

      const { tempFilePath } = req.files.picture;

      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

      user.picture = secure_url;
    }

    await user.save();

    res.status(200).json({
      user,
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
    const user = await findUserByIdAndDelete(id);

    res.status(200).json({
      msg: "User has been deleted",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const getUserFavorites = async (req, res) => {
  const { id = "" } = req.params;
  try {
    const user = await findUserById(id);

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
