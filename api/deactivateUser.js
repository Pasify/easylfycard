import https from "https";

export default function deactivateUser(req, res) {
  const KEY = process.env.VITE_PAYSTACK_TEST_SECRET_KEY;

  const params = JSON.stringify({
    authorization_code: "some",
  });
  const options = {
    hostname: "'api.paystack.co'",
    port: 443,
    path: "/customer/authorization/deactivate",
    method: "POST",
    headers: {
      Authorization: `Bearer YOUR_SECRET_KEY`,

      "Content-Type": "application/json",
    },
  };
}
