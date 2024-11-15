import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  // Extract transaction data from the state (if provided)
  const transactionData = location.state?.transaction || {};

  // useEffect(() => {
  //   // Redirect to the home page after 5 seconds
  //   const timer = setTimeout(() => {
  //     navigate("/");
  //   }, 5000);

  //   return () => clearTimeout(timer); // Cleanup timeout on unmount
  // }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700">
          Your transaction was completed successfully.
        </p>
        {transactionData.id && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <strong>Transaction ID:</strong> {transactionData.id}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Amount:</strong> ${transactionData.amount}
            </p>
          </div>
        )}
        <p className="mt-6 text-gray-500 text-sm">
          You will be redirected to the home page shortly.
        </p>
      </div>
    </div>
  );
}

export default ThankYou;
