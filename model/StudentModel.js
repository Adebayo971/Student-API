import mongoose from "mongoose"

const studentShema = new mongoose.Schema({
    name: {type: String, required: true},
    registrationNumber: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
})

export default mongoose.model("students", studentShema)