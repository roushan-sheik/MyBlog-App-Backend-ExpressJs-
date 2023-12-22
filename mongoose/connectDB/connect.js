import mongoose from "mongoose";

function generateConnectionString() {
  const connectionURL = process.env.MONGO_URI;
  const dbName = process.env.MONGO_USERNAME;
  const query = process.env.MONGO_QUERYSTRING;
  return `${connectionURL}/${dbName}?${query}`;
}

const ConnectDB = async () => {
  const url = generateConnectionString();
  const options = { autoIndex: false };
  await mongoose.connect(url, options);
  console.log("Database connection successfully");
};

export default ConnectDB;
