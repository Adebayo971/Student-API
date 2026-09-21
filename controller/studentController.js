import studentModel from "../model/StudentModel.js"
import bcrypt from "bcrypt"

// 1. Create a Student Account
const createStudent = async (req, res) => {
  try {
    const { name, registrationNumber, email } = req.body;
    
    // Check if email exists
    const exists = await studentModel.findOne({ email })
    if(exists){
      return res.status(400).json({ message: "Email already exists" })
    }

    const genSalt = await bcrypt.genSalt(10)
    const hashRegNo = await bcrypt.hash(registrationNumber, genSalt)
    
    const student = await studentModel.create({
      name,
      registrationNumber: hashRegNo,
      email
    });
    
    return res.status(201).json({
      message: "Student created succesfully",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// login
const studentLogin = async (req, res) => {
  try {
    const { registrationNumber, email } = req.body
    const user = await studentModel.findOne({ email })
    
    if (!user) {
      return res.status(404).json({
        message: "You did not have an account"
      })
    } 

    const isMatch = await bcrypt.compare(registrationNumber, user.registrationNumber)
    
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong email or registration number" })
    }
    
    return res.status(200).json({ message: "Login succesful", data: user })

  } catch (error) {
    return res.status(500).json({ message: error.message }) 
  }
}

// 2. Update Student Profile
const updateStudentName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const update = await studentModel.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    return res.status(200).json({
      message: "Student Name succesfully updated",
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// 3. Delete Student Account
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteoneStudent = await studentModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Student deleted succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// 4. Get Student Details
const getOneStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const findStudent = await studentModel.findById(id);

    if (!findStudent) {
      return res.status(404).json({
        message: "student not found",
      });
    }
    return res.status(200).json({
      message: "Student fetch succesfully",
      data: findStudent,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
};

export { createStudent, updateStudentName, deleteStudent, getOneStudent, studentLogin }