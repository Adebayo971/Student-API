import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String },
  link: { type: String }, // github link
  grade: { type: Number },
}, { timestamps: true })

export default mongoose.model("Project", projectSchema)