import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { event, data } = req.body; // This data will be sent by Paystack

    // Check the status of the event
    if (event === "charge.success" && data.status === "success") {
      // Payment was successful
      console.log("Payment Successful:", data);
      // Here, you might update your database with the payment status
      // For example:
      // await updatePaymentStatus(data.reference, "success");
    } else {
      // Payment failed or was incomplete
      console.log("Payment Failed or Incomplete:", data);
      // Handle the failed payment appropriately
    }

    res.status(200).send("Payment callback received"); // Respond to Paystack to confirm receipt
  } else {
    res.status(405).send("Method not allowed");
  }
}
