import axios from "axios";
// import { env } from "process";

const KEY = import.meta.VITE_PAYSTACK_PUBLIC_KEY;
async function initializeDD() {
  try {
    const response = await axios.post(
      "https://easylyfcard.vercel.app/api/paystack",
      {
        email: "ifesinachiobiora73@gmail.com",
        channel: "direct_debit",
        callback_url: "https://easylyfcard.vercel.app/api/payment-cb",
      }
    );
    console.log("Payment Initialized:", response.data);
  } catch (err) {
    console.error("Error initializing payment:", err);
    console.log(err);
  }
}
export default initializeDD;
