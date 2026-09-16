import express from "express"
const projectRoute = express.Router()
import { createProject, getAllProject, getOneProject, updatePoduct, deleteProject} from "../controller/projectController.js"

projectRoute.post("/create-project/:id", createProject)
projectRoute.get("/get-all", getAllProject)
projectRoute.get("/get-one-project/:id", getOneProject)
projectRoute.patch("/update/:id", updatePoduct)
projectRoute.delete("/delete/:id", deleteProject)

export default projectRoute