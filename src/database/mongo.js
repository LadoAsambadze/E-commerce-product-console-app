import mongoose from "mongoose";

const connect = () => {
  const url = "mongodb+srv://lado:bitcamp@cluster0.1vw91ap.mongodb.net/";

  try {
    mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
