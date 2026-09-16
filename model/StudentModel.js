import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    registrationNumber: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }] // ✅ ARRAY + capital P
}, { timestamps: true })

export default mongoose.models.Student || mongoose.model("Student", studentSchema) 