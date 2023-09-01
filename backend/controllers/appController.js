const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { password, cpassword, name, email } = req.body;
  try {
    if (!name || !email || !password || !cpassword) {
      console.log("here");
      return res
        .status(400)
        .json({ error: "Fill required fields", success: false });
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(403)
        .json({ error: "User Already Exists", success: false });
    } else {
      const newUser = new User({
        name,
        email,
        password,
        cpassword,
        isActiveUser:false,
      });
      try {
        const user = await newUser.save();
        return res
          .status(200)
          .json({ message: "Registration Done!", success: true });
      } catch (error) {
        return res.status(500).send({ error: error, success: false });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: error, success: false });
  }
};


const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Fill in all details", success: false });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({ error: "User Not Found", success: false });
    } else {
      const verifyPass = await bcrypt.compare(password, userExist.password);
      if (verifyPass) {
        const id = userExist._id;
        const token = jwt.sign({ id}, process.env.JWT, {
          expiresIn: "7d", // Token expires in 7 days
        });

        const cookieOptions = {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set the expiration time in milliseconds
          httpOnly: true,
          secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        };
        console.log(cookieOptions);
        return res
          .cookie("jwt", token, cookieOptions)
          .status(201)
          .json({ message: "Login Successful", success: true });
      } else {
        return res
          .status(401)
          .json({ error: "Invalid credentials", success: false });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

const activeUser = async (req,res)=>{
    const id = req.params.id;
    console.log(id);
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ error: "User Not Found", success: false });
    }  
    try {
        const setActive = await User.findByIdAndUpdate(
          { _id: id },
          { isActiveUser: true }
        );
        if (setActive) {
          return res.status(201).json("Active");
        }
    } catch (error) {
          return res.status(401).json(error);
        
    }

}

const deActiveUser = async (req,res)=>{
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist || userExist.isActiveUser == false) {
      return res.status(404).json({ error: "User Not Found", success: false });
    }  
    try {
        const desetActive = await User.findByIdAndUpdate(
          { _id: id },
          { isActiveUser: false }
        );
        if (desetActive) {
          return res.status(201).json("Active Off");
        }
    } catch (error) {
          return res.status(401).json(error);
        
    }

}



const getAllUser = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    res.status(200).json(error);
  }
};


const getUser = async (req, res) => {
  try {
    const token = req.userData;
    res.json(token);
  } catch (error) {
    res.status(200).json(error);
  }
};

const getActiveUser = async (req, res) => {
  try {
    const users = await User.find({isActiveUser:true});
    res.json(users);
  } catch (error) {
    res.status(200).json(error);
  }
};

const addMoney = async (req, res) => {
    const amount = req.body.amount;
  try {
    const users = await User.updateMany({amounts:amount});
    res.json(users);
  } catch (error) {
    res.status(200).json(error);
  }
};
const removeMoney = async (req, res) => {
    const amount = 0;
  try {
    const users = await User.updateMany({amounts:amount});
    res.json(users);
  } catch (error) {
    res.status(200).json(error);
  }
};




module.exports = { registerController, loginController, getAllUser , activeUser , deActiveUser , getActiveUser , addMoney, removeMoney , getUser};
