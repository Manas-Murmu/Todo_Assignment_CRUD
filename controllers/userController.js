const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validate the data, if exists
    if (!(name && email && password)) {
      res.status(401).send("All fileds are required");
    }
    //check if email is in correct format

    //check if user exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send("User already found in database");
    }

    //encrypt the password
    const myEncyPassword = await bcrypt.hash(password, 10);
    console.log(myEncyPassword);

    //create a new entry in database
    const user = await User.create({
      name,
      email,
      password: myEncyPassword,
    });

    //create a token and send it to user
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      "shhhhh",
      { expiresIn: "2h" }
    );

    user.token = token;
    //don't want to send the password
    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    console.log("Error is response route");
  }
};

exports.logInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(401).json({
        success: false,
        message: "Email and Password Required",
      });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email }, "shhhhh", {
        expiresIn: "2h",
      });

      user.password = undefined;
      user.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    } else {
      res.status(400).json({
        message: "Email or Password is Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    console.log("Test");
    res.status(200).json({
      success: true,
      message: "Logout Success",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.dashBoard = async (req, res) => {
  res.send("Welcome to Dashboard");
};

exports.getLoginUser = async (req, res) => {
  try {
    const { email, id } = req.user;
    console.log(email, id);
    if (!email && !id) {
      res.send("User Email Not Found");
    }
    res.status(200).json({
      success: true,
      email,
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

// exports.createUser = async (req, res) => {
//   try {
//     const { userId, email, phone, password, name } = req.body;

//     client
//       .setEndpoint("http://localhost/v1") // Your API Endpoint
//       .setProject("63859b56da9071509268") // Your project ID
//       .setKey(
//         "db66674e4e44728c50923eb533f8c8de1a5c6aace5814ce0109723c927672219d58744c0d3259193898113a98237c0889bc1ef62a73eff3e028a7618f4a3afaab131b605f2332ba08799c4ef70ef20c030ba7965e86c977358d38bb34ff885d9e6b26c5b7ce207c4411564e2a3db0e6fec232288d5e6e410df5a762aa6316ae1"
//       ); // Your secret API key

//     const promise = users.createBcryptUser(
//       userId,
//       email,
//       phone,
//       password,
//       name
//     );

//     promise.then(
//       function (response) {
//         console.log(response);
//         res.json({
//           success: true,
//         });
//       },
//       function (error) {
//         console.log(error);
//         res.status(400).json({
//           message: error.message,
//         });
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     console.log("Error is response route");
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
