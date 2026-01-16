import express from "express";
import loginController from "../controllers/login.controllers.js";

const loginRouter = express.Router();
const LoginController = new loginController();

loginRouter.post("/login",LoginController.userLogin);

export default loginRouter;