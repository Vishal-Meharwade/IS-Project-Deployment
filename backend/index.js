// const express = require("express");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Configure nodemailer
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "vishalmeharwade1@gmail.com", // Replace with your email
//     pass: "nwry ujsk pgau nkvf", // Replace with your email password or app-specific password
//   },
// });

// // Endpoint to send OTP
// app.post("/send-otp", (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Email is required" });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

//   const mailOptions = {
//     from: "vishalmeharwade1@gmail.com",
//     to: email,
//     subject: "Your OTP for Signup",
//     text: `Your OTP is: ${otp}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending OTP:", error);
//       return res
//         .status(500)
//         .json({ success: false, message: "Failed to send OTP" });
//     }
//     console.log("Email sent:", info.response);
//     res.json({ success: true, message: "OTP sent successfully", otp }); // In a real app, don't send OTP in response!
//   });
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vishalmeharwade1@gmail.com", // Your email
    pass: "nwry ujsk pgau nkvf", // Your app-specific password
  },
});

mongoose
  .connect(
    "mongodb+srv://vishalmeharwade1:aPFQfozX4obSpC43@cluster0.lqvmb.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

const otpStore = {};

app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const mailOptions = {
    from: "vishalmeharwade1@gmail.com",
    to: email,
    subject: "Your OTP for Signup",
    text: `
    IS_PROJECT OTP test
    
    Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending OTP:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to send OTP" });
    }
    console.log("Email sent:", info.response);
    res.json({ success: true, message: "OTP sent successfully" });
  });
});

// Endpoint to validate OTP
app.post("/validate-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP are required" });
  }

  const storedOtp = otpStore[email];
  if (storedOtp && storedOtp === otp) {
    delete otpStore[email]; // Clear OTP after successful validation
    return res.json({ success: true, message: "OTP validated successfully" });
  }

  res.status(400).json({ success: false, message: "Invalid OTP" });
});

// Endpoint to store signup details in MongoDB
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.json({ success: true, message: "Signup details stored successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving user details" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
