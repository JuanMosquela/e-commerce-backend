import Cart from "../models/cartSchema.js";

const findCartById = async (id) => {
  try {
    const cart = await Cart.findById(id).populate([
      "owner",
      {
        path: "items",
        populate: {
          path: "item",
        },
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

export { findCartById };
