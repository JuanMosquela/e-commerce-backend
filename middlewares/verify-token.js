import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      msg: "No token",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    const authenticatedUser = await User.findById(id);
    req.user = authenticatedUser;

    next();
  } catch (error) {
    console.log(error);
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json("You are not alowed to do that");
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    next();
  } else {
    return res.status(403).json("You are not alowed to do that!");
  }
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
