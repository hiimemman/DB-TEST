import { Router } from "express";

import { AddUser, DeleteUserById, GetAllUser, GetUserById, UpdateUserById, UpdateUserByIdBody } from "../controllers/UserController";
import { IsAuthMiddleware } from "../middlewares/IsAuthMiddleware";
const UserRouter = Router();

UserRouter.get('/user', IsAuthMiddleware, GetAllUser);
UserRouter.get('/user/:id', IsAuthMiddleware, GetUserById);    
UserRouter.post('/user', AddUser);
UserRouter.delete('/user/:id', IsAuthMiddleware, DeleteUserById);
UserRouter.put('/user/:id', IsAuthMiddleware, UpdateUserById);
// UserRouter.post('/user/update', UpdateUserByIdBody);

export default UserRouter;  