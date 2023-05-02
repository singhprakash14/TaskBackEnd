import mongoose from "mongoose";


 const connection = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
 
      console.log(`Database Connected to ${mongoose.connection.host}`.red.bgGreen.bold);
  } catch (err) {
    console.log(err);
  }
};

export default  connection 