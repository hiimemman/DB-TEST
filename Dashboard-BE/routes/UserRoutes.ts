import { Router } from "express";

import { AddUser, DeleteUserById, GetAllUser, GetUserById, UpdateUserById } from "../controllers/UserController";
import { IsAuthMiddleware } from "../middlewares/IsAuthMiddleware";
const UserRouter = Router();

UserRouter.get('/user', IsAuthMiddleware, GetAllUser);
UserRouter.get('/user/:id', IsAuthMiddleware, GetUserById);    
UserRouter.post('/user', IsAuthMiddleware, AddUser);
UserRouter.delete('/user/:id', IsAuthMiddleware, DeleteUserById);
UserRouter.post('/user/:id', IsAuthMiddleware, UpdateUserById);

export default UserRouter;  