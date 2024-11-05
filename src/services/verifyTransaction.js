import axios from "axios";

export default async function VerifyDDTransaction(reference) {
  const { reference: referenceCode } = reference;
  try {
    let response = await axios.post(
      "https://easylyfcard.vercel.app/api/paystack/verification",
      {
        referenceCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`response from endpoint`, response.data);
  } catch (error) {
    console.log(error);
  }
}
