import Cart from "../models/cartSchema.JS";

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
