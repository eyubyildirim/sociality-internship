const mongoose = require("mongoose");

const connectDB = async () => {
  // Connects to the MongoDB with URI provided in config.env file
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  // date = new Date().getTime();
  // console.log(`${date}`);
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
