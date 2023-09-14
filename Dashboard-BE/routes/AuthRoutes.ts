import Router from "express";
import { Authentication, CheckAuth, LogOut } from "../controllers/AuthController";
import { IsAuthMiddleware } from "../middlewares/IsAuthMiddleware";


const AuthRouter = Router();

AuthRouter.post('/login', Authentication)
AuthRouter.get('/logout', IsAuthMiddleware, LogOut)
AuthRouter.get('/check-auth',IsAuthMiddleware, CheckAuth)

export default AuthRouter;