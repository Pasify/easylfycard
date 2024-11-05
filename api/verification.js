import https from "https";

export default function verification(req, res) {
  const TEST_KEY = process.env.VITE_PAYSTACK_TEST_SECRET_KEY;
  const LIVE_KEY = process.env.VITE_PAYSTACK_LIVE;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  // Extract the transaction reference from the request body
  const { reference } = req.body;
  if (!reference) {
    return res.status(400).json({ error: "Transaction reference is required" });
  }

  // Options for Paystack transaction verification
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: `/transaction/verify/${reference}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${LIVE_KEY}`,
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
