import express from "express"

const studentRoute = express.Router()
import {createStudent, updateStudentName, deleteStudent, getOneStudent} from "../controller/studentController.js"

studentRoute.post("/create-student", createStudent)
studentRoute.patch("/update-student-name/:id", updateStudentName)
studentRoute.delete("/delete-one-student/:id", deleteStudent)
studentRoute.get("/get-student/:id", getOneStudent )

export default studentRoute