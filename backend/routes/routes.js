const express = require("express");
const route = express.Router();
const {
  loginController,
  registerController,
  getAllUser,
  activeUser,
  deActiveUser,
  getActiveUser,
  addMoney,
  removeMoney,
  getUser
} = require("../controllers/appController");
const { protect } = require("../middlewear/middlewear");

route.get("/", (req, res) => {
  res.send("API Is Running 😁😮");
});
route.post("/register", registerController);
route.post("/login", loginController);
route.post("/active/:id", activeUser);
route.post("/activeOff/:id", deActiveUser);
route.post("/addMoney", addMoney);
route.post("/removeMoney", removeMoney);
route.get("/allUser", getAllUser);
route.get("/user",protect, getUser);
route.get("/activeUser", getActiveUser);

module.exports = route;
