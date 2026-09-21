import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'

// create new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    // check if email exist 
    const exssts = await userModel.findOne({email})
    if(exist){
      return res.status(400).json({
        message: 'email alreadt exist, try new email'
      })
    }
    const genSalt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, genSalt)
    const User = await userModel.create({
      name,
      email,
      password: hashPassword,
      image,
    });
    return res.status(201).json({
      message: "User created succesfully",
      data: User,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Login
const userLogin = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).json({
        message: 'You did not have an account with us'
      })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(400).json({
        message: 'wrong email or password'
      })
    }
    return res.status(200).json({
      message: 'Login succesful', data: user
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// get all user
const getAllUser = async (req, res) => {
  try {
    const getAll = await userModel.find();
    if (!getAll) {
      return res.status(400).json({
        message: "No user found",
      });
    }
    return res.status(200).json({
      message: "User fetch succesfully",
      data: getAll,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get one user
const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getOne = await userModel.findById(id);
    if (!getOne) {
      return res.status(401).json({
        message: "no user found",
      });
    }
    return res.status(200).json({
      message: "message fetch succesfully",
      data: getOne,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update user name
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const update = await userModel.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    return res.status(200).json({
      message: "user updated succcesfuly",
      date: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// delete user
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const deleteUser = userModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: 'user deleted succesful'
        })
    } catch (error) {
        return res.status(500).json({
           message: error.message 
        })
    }
};

export {createUser, getAllUser, getOneUser, updateUser, deleteUser}
