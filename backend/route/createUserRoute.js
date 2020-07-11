import express from "express";
import User from "../models/UserModels";
import { getToken } from "../util";

const router = express.Router();

router.post("/signin", async (req, res, next) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.status(200).send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({
      message: "Invalid email or Password",
    });
  }
});

router.get("/createAdmin", async (req, res, next) => {
  try {
    const user = new User({
      name: "Abbas",
      email: "abbasashraff1213@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid User Data." });
  }
});
module.exports = router;
