import express from "express";
import {
  signupController,
  loginController,
} from "../controllers/auth.controller.js";
import { validateLogin, validateSignup } from "../validators/authValidator.js";

const Router = express.Router();

Router.route("/signup").post(validateSignup,signupController);
Router.route("/login").post(validateLogin,loginController);

export default Router;
