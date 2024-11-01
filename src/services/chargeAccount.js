import axios from "axios";

export default async function chargeAccount(accountData) {
  try {
    const response = await axios.post(
      "https://easylyfcard.vercel.app/api/chargeUser"
    );
  } catch (error) {
    console.log(error);
  }
}
