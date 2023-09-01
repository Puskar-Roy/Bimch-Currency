const User = require('../models/User');
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const { email } = req.method === "GET" ? req.query : req.body;
    const findUser = await User.findOne({ email: email });
    console.log(findUser);
    if (!findUser) {
      res.status(400).json({ error: "Can't Find User" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: "Authentication Error " });
  }
};

// const verifyToken = async (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     console.log("Not found cookies");
//     return res.status(400).json({ error: "At First Login " });
//   } else {
//     try {
//       const verify = await jwt.verify(token, process.env.JWT);
//       if (verify) {
//         console.log("verify Done");
//         const data = await User.findOne({ _id: verify.id });
//         if (data) {
//           req.userData = data;
//           next();
//         } else {
//           return res.status(400).json({ error: "At First Login " });
//         }
//       } else {
//         return res.status(400).json({ error: "At First Login " });
//       }
//     } catch (error) {
//       return res.status(400).json({ error: error });
//     }
//   }
// };


const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }

  if (!token) {
    return res.status(401).json({ message: "Log In First" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    console.log(decoded);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({ message: "User Not Found" });
    }

    req.user = currentUser;
    res.locals.user = currentUser;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Log In First" });
  }
};




module.exports = { verifyUser, protect };
