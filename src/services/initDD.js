import axios from "axios";
// import { env } from "process";

const KEY = import.meta.VITE_PAYSTACK_TEST_SECRETE_KEY;
async function initializeDirectDebit() {
  try {
    const response = await axios.post(
      "https://easylyfcard.vercel.app/api/paystack",
      {
        email: "ifesinachiobiora73@gmail.com",
        channel: "direct_debit",
        callback_url: "https://easylyfcard.vercel.app/api/payment-cb",
      },
      {
        // headers: {
        //   Authorization: `Bearer ${KEY}`,
        //   "Content-Type": "application/json",
        // },
      }
    );
    console.log("Payment Initialized:", response.data);
  } catch (err) {
    console.error("Error initializing payment:", err);
    console.log(err);
  }
}
export default initializeDirectDebit;
