import express from "express";
const router = express.Router();

router.post("/callback", (req, res) => {
  const data = req.body;

  console.log("✅ MPESA CALLBACK RECEIVED:");
  console.log(JSON.stringify(data, null, 2));

  // Optional: Save `data` to a database here for transaction tracking

  res.status(200).send("Callback received");
});

export default router;
