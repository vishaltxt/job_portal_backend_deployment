import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' }); // Load environment variables
import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});
const PORT = 4000;
// Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(process.env.PORT, () => {
// console.log(`server runing at port ${process.env.PORT}`);
// });
// connectDb().then(() => {
app.listen(PORT, () => {
  console.log(`server is running at port:${PORT}`);
});
// });