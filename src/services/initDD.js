import axios from "axios";

async function initializeDD() {
  try {
    const response = await axios.post(
      "https://easylyfcard.vercel.app/api//paystack",
      {
        email: "jeyasoy633@kunsum.com",
        channel: "direct_debit",
        callback_url: "https://easylyfcard.vercel.app/api/payment-callback",
      }
    );
    console.log("Payment Initialized:", response.data);
  } catch (err) {
    console.error("Error initializing payment:", err);
    console.log(err);
  }
}
export default initializeDD;
