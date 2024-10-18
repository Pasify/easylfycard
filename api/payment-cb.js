import https from "https";
import { env } from "process";
export default function handler(req, res) {
  // Check if the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Extract the transaction reference from the request body
  const { reference } = req.body;
  if (!reference) {
    return res.status(400).json({ error: "Transaction reference is required" });
  }
  // Paystack secret key (should be stored in environment variables)
  const PAYSTACK_SECRET_KEY = env.VITE_PAYSTACK_PUBLIC_KEY;

  // Options for Paystack transaction verification
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  };

  // Make a request to Paystack to verify the transaction
  const paystackReq = https.request(options, (paystackRes) => {
    let data = "";

    paystackRes.on("data", (chunk) => {
      data += chunk;
    });

    paystackRes.on("end", () => {
      const responseData = JSON.parse(data);

      if (responseData.data && responseData.data.status === "success") {
        // Payment was successful - perform your desired actions here
        return res.status(200).json({
          message: "Payment verified successfully",
          data: responseData,
        });
      } else {
        // Payment failed or was not successful
        return res
          .status(400)
          .json({ message: "Payment verification failed", data: responseData });
      }
    });
  });

  paystackReq.on("error", (error) => {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ error: "Internal server error" });
  });

  paystackReq.end();
}
