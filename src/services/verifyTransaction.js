import axios from "axios";

export default async function VerifyDDTransaction(reference) {
  try {
    let response = axios.post(
      "https://easylyfcard.vercel.app/api/paystack/verification",
      {
        reference,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`response from endpoint`, reponse);
  } catch (error) {
    console.log(error);
  }
}
