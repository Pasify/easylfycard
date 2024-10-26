import https from "https";
export default async function handler(req, res) {
  const KEY = process.env.VITE_PAYSTACK_TEST_SECRET_KEY;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { data } = req.body;

  if (!data || !data.reference) {
    return res.status(400).json({ error: "Invalid data or missing reference" });
  }

  // Verify the transaction with Paystack
  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: `/transaction/verify/${data.reference}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${KEY}`,
    },
  };

  https
    .request(options, (paystackRes) => {
      let responseData = "";

      paystackRes.on("data", (chunk) => {
        responseData += chunk;
      });

      paystackRes.on("end", () => {
        const result = JSON.parse(responseData);
        if (result.data && result.data.status === "success") {
          // Payment verified and successful
          console.log("Payment successful:", result.data);
          res.status(200).json({ message: "Payment verified and successful" });
        } else {
          // Payment verification failed
          console.log("Payment not successful:", result.data);
          res
            .status(400)
            .json({ message: "Payment verification failed or pending" });
        }
      });
    })
    .on("error", (error) => {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: "Internal server error" });
    })
    .end();
}
