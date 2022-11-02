import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("base de datos conectada ");
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
