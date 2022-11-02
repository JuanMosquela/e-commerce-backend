import User from "../models/userSchema.js";

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

const passwordExist = async (password) => {
  const passwordInDB = await User.findOne({ password });

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

export { idExist, nameExist, emailExist, passwordExist };
