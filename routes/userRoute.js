import express from "express"

const userRoute = express.Router()
import  {createUser, getAllUser, getOneUser, updateUser, deleteUser} from "../controller/userController.js"

userRoute.post("/create-user", createUser)
userRoute.get("/get-all", getAllUser)
userRoute.get('/get-one-user/:id', getOneUser)
userRoute.patch("/update/:id", updateUser)
userRoute.delete("delete/:id", deleteUser)

export default userRoute