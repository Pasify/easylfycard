import axios from "axios";

export default async function chargeAccount(accountData) {
  const { authorization_code, email, amount } = accountData;
  try {
    const response = await axios.post(
      "https://easylyfcard.vercel.app/api/chargeUser",
      {
        email: email,
        amount: amount,
        authorization_code: authorization_code,
      }
    );
    if (response) {
      console.log(`response received: `, response);
    }
  } catch (error) {
    console.error("Error charging users account:", error);
  }
}
