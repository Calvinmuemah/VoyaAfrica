const axios = require("axios");
const moment = require("moment");
const base64 = require("base-64");

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const shortcode = process.env.SHORTCODE;
const passkey = process.env.PASSKEY;
const phone = process.env.PHONE_NUMBER;

const getAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  const res = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res.data.access_token;
};
// process.env.
const stkPush = async () => {
  const token = await getAccessToken();
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = base64.encode(shortcode + passkey + timestamp);

  const res = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: "https://yourdomain.com/callback",
      AccountReference: "Test123",
      TransactionDesc: "Testing Daraja STK Push"
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  console.log(res.data);
};

stkPush().catch(console.error);
