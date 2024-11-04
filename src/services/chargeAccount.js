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

    if (response.data && response.data.type === "validation_error") {
      // throw new Error(response.data.message);
      return {
        message: response.data.message,
        success: false,
        type: response.data.type,
      };
    }
    console.log(`response received: `, response);
    return {
      message: "Account charged successfully",
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error charging users account:", error);
    return {
      message: "An error occurred while charging the account",
      success: false,
      type: "network_error",
    };
  }
}
