import axios from "axios";
// import { env } from "process";

const KEY = import.meta.env.VITE_PAYSTACK_TEST_SECRET_KEY;

async function initializeDirectDebit() {
  try {
    const response = await axios.post(
      "https://easylyfcard.vercel.app/api/paystack",
      {
        email: "ifesinachiobiora73@gmail.com",
        channel: "direct_debit",
        callback_url: "https://easylyfcard.vercel.app/api/payment-cb",
      }
    );
    if (response) {
      console.log("Payment Initialized:", response.data);
    }
  } catch (err) {
    console.error("Error initializing payment:", err);
  }
}
export default initializeDirectDebit;
