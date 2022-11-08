import Category from "../models/categorySchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

// const validRole = async (rol = "") => {
//   const rolExist = await Role.findOne({ rol });
//   if (!rolExist) {
//     throw new Error("El rol no esta registrado en la base de datos");
//   }
// };

const idExist = async (id) => {
  const idInDB = await User.findById(id);
  if (!idInDB) {
    throw new Error(`The id ${id} its not valid or dosent exist`);
  }
};

const productIDExist = async (id) => {
  const productInDB = await Product.findById(id);
  if (!productInDB) {
    throw new Error(`There is no product in the database with this id`);
  }
};

const categoryExist = async (name) => {
  const categoryInDB = await Category.findOne({ name });
  if (categoryInDB) {
    throw new Error(`The email ${name} already exist`);
  }
};

const categoryIDExist = async (id) => {
  const categoryIDinDB = await Category.findById(id);
  if (!categoryIDinDB) {
    throw new Error(`This ${id} is invalid or dosent exist`);
  }
};

const passwordExist = async (password) => {
  const user = await User.findOne({ password });

  console.log(user);

  const match = await bcrypt.compare(password, user.password);

  if (passwordInDB) {
    throw new Error(`The password alreay exist`);
  }
};

const emailExist = async (email) => {
  const emailInDB = await User.findOne({ email });
  if (emailInDB) {
    throw new Error(`The email ${email} already exist`);
  }
};

const nameExist = async (name) => {
  const nameInDB = await User.findOne({ name });
  if (nameInDB) {
    throw new Error(`The username ${name} already exist`);
  }
};

export {
  idExist,
  nameExist,
  emailExist,
  passwordExist,
  categoryExist,
  categoryIDExist,
  productIDExist,
};
