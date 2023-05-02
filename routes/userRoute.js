import express from "express";


import { deleteUser, getUserByID, updateUser, usersList } from "../controllers/user.controller.js";
import { ValidateUser } from "../middleware/authorization.js";

const Router = express.Router();

Router.route("/users").get(ValidateUser,usersList);

Router.route("/user/:id")
  .get(ValidateUser, getUserByID)
  .put(ValidateUser, updateUser)
  .delete(ValidateUser, deleteUser);

export default Router;
