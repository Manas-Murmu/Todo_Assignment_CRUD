const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).send("Token is Missing");
  }

  try {
    const decode = jwt.verify(token, "shhhhh");
    console.log(decode);
    req.user = decode;

    //
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Token is Invalid",
    });
  }

  return next();
};

module.exports = auth;
