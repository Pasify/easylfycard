import axios from "axios";

export default async function VerifyDDTransaction(reference) {
  try {
    let response = axios.post(
      "https://easylyfcard.vercel.app/api/paystack/verification",
      {
        reference,
      }
    );
    console.log(`response from endpoint`, response.data);
  } catch (error) {
    console.log(error);
  }
}
