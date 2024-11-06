import axios from "axios";

export default async function VerifyDDTransaction(reference) {
  try {
    let response = await axios.post(
      "https://easylyfcard.vercel.app/api/verification",
      {
        reference: reference,
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
