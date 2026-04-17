import express from 'express'
import { signUp,login,findUsers,findUserByIdByBody,findUserByIdByParams, forgotPassword, 
  resetPassword,userUpdate, deleteUser } from '../controllers/usercontroller.js'

const userRouter = express.Router()

userRouter.post("/signup",signUp)
userRouter.post("/login", login)
userRouter.get("/findUsers", findUsers)
userRouter.post("/findUserByIdByBody", findUserByIdByBody)
userRouter.get("/findUserByIdByParams/:id",findUserByIdByParams)
userRouter.put("/userUpdate", userUpdate)
userRouter.delete("/deleteUser/:id", deleteUser)
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

export default userRouter;

