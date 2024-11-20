import axios from "axios";

export default async function submitRegistration(userInfo) {
  try {
    let response = await axios.post(
      "https://easylyfcard.vercel.app/api/submitForm",
      userInfo,
    );
    if (response) {
      console.log(`response received `, response);
    }
  } catch (error) {
    console.log(`error message is: `, error);
  }
}
