import { uploadFileHelper } from "../helpers/uploadFile-helper.js";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";
import cloudinaryModule from "cloudinary";
const cloudinary = cloudinaryModule.v2;
cloudinary.config(process.env.CLOUDINARY_URL);

import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const uploadFile = async (req, res) => {
  try {
    const fileName = await uploadFileHelper(req.files, "imgs");

    res.json({
      fileName,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const modifyFile = async (req, res) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvido de programar esto" });
  }

  if (model.picture) {
    const pathPicture = join(
      __dirname,
      "../uploads",
      collection,
      model.picture
    );

    if (fs.existsSync(pathPicture)) {
      fs.unlinkSync(pathPicture);
    }
  }

  const fileName = await uploadFileHelper(req.files, collection);

  model.picture = fileName;

  await model.save();

  res.json({
    model,
  });
};

const modifyFileCloudinary = async (req, res) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvido de programar esto" });
  }

  if (model.picture) {
    const fileArray = model.picture.split("/");
    const fileName = fileArray[fileArray.length - 1];
    const [public_id] = fileName.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.picture;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  // const fileName = await uploadFileHelper(req.files, collection);

  model.picture = secure_url;

  await model.save();

  res.json({
    model,
  });
};

const getFile = async (req, res) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvido de programar esto" });
  }

  if (model.picture) {
    const pathPicture = join(
      __dirname,
      "../uploads",
      collection,
      model.picture
    );

    if (fs.existsSync(pathPicture)) {
      return res.sendFile(pathPicture);
    }
  }

  const notFound = join(__dirname, "../assets/not-found.jpg");

  res.sendFile(notFound);
};

export { uploadFile, modifyFile, modifyFileCloudinary, getFile };
