import express from "express"

const studentRoute = express.Router()
import {createStudent, updateStudentName, deleteStudent, getOneStudent, studentLogin} from "../controller/studentController.js"

studentRoute.post("/create-student", createStudent)
studentRoute.patch("/update-student-name/:id", updateStudentName)
studentRoute.delete("/delete-one-student/:id", deleteStudent)
studentRoute.get("/get-student/:id", getOneStudent )
studentRoute.get("/login", studentLogin)

export default studentRoute