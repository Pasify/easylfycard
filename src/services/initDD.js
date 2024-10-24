import axios from "axios";

async function initializeDirectDebit() {
  try {
    const response = await axios.post(
      "https://easylyfcard.vercel.app/api/paystack",
      {
        email: "3dorts@gmail.com",
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
