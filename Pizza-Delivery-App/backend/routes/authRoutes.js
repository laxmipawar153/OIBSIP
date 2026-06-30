const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();



// REGISTER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000
});

const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;


await sendEmail(
  user.email,
  "Verify Your PizzaHub Account",
  `
    <div style="font-family:Arial;padding:20px">

      <h2>Welcome to PizzaHub 🍕</h2>

      <p>Please verify your email by clicking below:</p>

      <a href="${verificationLink}"
         style="
           background:#ea580c;
           color:white;
           padding:12px 14px;
           text-decoration:none;
           border-radius:6px;
           display:inline-block;
           margin-top:10px;
         ">
         Verify Email
      </a>

      <p style="margin-top:20px;font-size:12px;color:gray">
        If button doesn't work, copy this link:<br/>
        ${verificationLink}
      </p>

    </div>
  `
);

   res.status(201).json({
    message: "Registration successful. Please check your email to verify your account."
});

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    if (!user.isVerified) {

    return res.status(401).json({
        message: "Please verify your email before logging in."
    });

}

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {

      return res.status(400).json({
        message: "Invalid Password"
      });

    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// FORGOT PASSWORD

router.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetToken = resetToken;

        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        await sendEmail(

            user.email,

            "Pizza App Password Reset",

            `Click the link to reset your password:\n\n${resetLink}`

        );

        res.json({

            message: "Password reset email sent."

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

// RESET PASSWORD

router.post("/reset-password/:token", async (req, res) => {

    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({

            resetToken: token,

            resetTokenExpiry: { $gt: Date.now() }

        });

        if (!user) {

            return res.status(400).json({

                message: "Invalid or Expired Token"

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.json({

            message: "Password Reset Successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

// VERIFY EMAIL

router.get("/verify-email/:token", async (req, res) => {

  try {

    const { token } = req.params;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid or Expired Verification Link"
      });

    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Email Verified Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


router.get("/profile", authMiddleware, async (req, res) => {

    res.json({
        message: "Welcome! You are logged in.",
        user: req.user
    });

});


module.exports = router;