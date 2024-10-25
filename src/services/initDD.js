import axios from "axios";
import toast from "react-hot-toast";

async function initializeDirectDebit(emailData) {
  try {
    const response = await axios.post(
      "https://easylyfcard.vercel.app/api/paystack",
      {
        email: emailData,
        channel: "direct_debit",
        callback_url: "https://easylyfcard.vercel.app/api/payment-cb",
      }
    );
    if (response) {
      console.log("Payment Initialized:", response.data);
      let { redirect_url: redirectUrl } = response.data.data;

      window.location.href = redirectUrl;
    }
  } catch (err) {
    console.error("Error initializing payment:", err);
  }
}
export default initializeDirectDebit;
