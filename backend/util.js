import jwt from "jsonwebtoken";
import config from "./config";
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token) {
    // const onlyToken = token.slice(7, token.length);
    jwt.verify(token, config.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log("inerror");
        console.log(err);
        return res.status(401).send({ msg: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    console.log("inelse");
    return res.status(401).send({ msg: "Token is not supplied." });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user.isAdmin);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid." });
};

export { getToken, isAdmin, isAuth };
