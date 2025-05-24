const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/AuthRoutes');
const nodemailer = require("nodemailer");


dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); 

app.use(cors({
  origin: "*",
}));

// Setup Nodemailer Transporter
const sendResetEmail = async (email, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // or another service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
  });
};

app.get("/", (req, res) => {
  res.send("welcome to VoyaAfrica!");
});

// Routes
app.use('/api', authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
