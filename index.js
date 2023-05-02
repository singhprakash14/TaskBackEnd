import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import connection from "./db/config.js";
import colors from "colors";
import cookieParser from "cookie-parser";


import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/userRoute.js'
import errorHandler from "./middleware/errorHandler.js";


const app = express();
app.use(errorHandler);
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.json());
app.use(morgan("dev"));

//  routes for login/signup
app.use('/api/v1',authRoutes)
app.use('/api/v1',userRoutes)

app.get("/", (req, res) => {
  return res.send("Hello, World!");
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, async () => {
  await connection();
  console.log(`Server listening on port ${PORT}`.red.bgWhite.bold);
});
