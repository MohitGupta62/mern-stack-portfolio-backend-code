import mongoose from "mongoose";

const dbConnetion = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "PORTFOLIO",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log(`Some error occured while connecting to database:  ${err}`);
    });
};

export default dbConnetion;
