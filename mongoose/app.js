import dotEnv from "dotenv";
import ConnectDB from "./connectDB/connect.js";

dotEnv.config();
async function main() {
  await ConnectDB();
}
main();
