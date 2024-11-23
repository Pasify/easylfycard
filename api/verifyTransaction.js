import https from "https";

export default function verifyAuthorization(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Origin", "*");

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
  const TEST_KEY = process.env.VITE_PAYSTACK_TEST_SECRET_KEY;
  const LIVE_KEY = process.env.VITE_PAYSTACK_LIVE;
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
      try {
        const responseData = JSON.parse(data);
        console.log("Paystack Response:", responseData);

        if (responseData.data) {
          const transactionStatus = responseData.data.status;

          // Check for specific status conditions
          if (transactionStatus === "success") {
            return res.status(200).json({
              message: "Payment verified successfully",
              data: responseData,
            });
          } else if (transactionStatus === "abandoned") {
            return res.status(202).json({
              message: "Payment was abandoned by the user",
              data: responseData,
            });
          } else if (transactionStatus === "pending") {
            return res.status(202).json({
              message: "Payment is still pending",
              data: responseData,
            });
          }
          // For any other status, return the response data as is
          return res.status(200).json({
            message: `Payment verification retrived with status`,
            data: responseData,
          });
        } else {
          // In case responseData.data is missing
          return res.status(400).json({
            message: "Unexpected response format from Paystack",
            data: responseData,
          });
        }
      } catch (error) {
        console.error("Error parsing response data:", error);
        return res
          .status(500)
          .json({ error: "Failed to process verification data" });
      }
    });
  });

  paystackReq.on("error", (error) => {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ error: "Internal server error" });
  });

  paystackReq.end();
}
