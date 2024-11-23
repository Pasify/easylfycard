import axios from "axios";

export default async function VerifyAuth(reference) {
  try {
    let response = await axios.post(
      "https://easylyfcard.vercel.app/api/verifyAuthorization",
      {
        reference: reference,
      },
    );
    console.log(`response from endpoint`, response.data);
    return response.data;
  } catch (error) {
    console.log(
      `error verifying transaction: `,
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}
