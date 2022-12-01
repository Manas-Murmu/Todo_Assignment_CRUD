const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  //const { token } = req.cookies;

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(403).send("Token is Missing");
  }

  try {
    const decode = jwt.verify(token, "shhhhh");
    console.log(decode);

    const user = await User.findById(decode.id);
    console.log(user);
    if (!user) {
      res.status(200).json({
        message: "No User Found to acces this Route",
      });
    }
    req.user = user;
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Not Authorized to Acces this Route",
    });
  }

  return next();
};

module.exports = auth;
