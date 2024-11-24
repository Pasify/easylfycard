function RenderAuthContent({ transactionData }) {
  return (
    <div className="space-y-6">
      {/* Transaction Status */}
      <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
        <h2 className="text-xl font-semibold">Authorization status</h2>
        <p
          className={`text-lg font-bold ${
            transactionData.active ? "text-green-500" : "text-red-500"
          }`}
        >
          {transactionData.active ? "Active" : "Inactive"}
        </p>
      </div>

      {/* Transaction Details Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-1 text-lg font-semibold">Transaction Details</h3>
          <p>
            <strong>Authorization Code:</strong>{" "}
            {transactionData?.authorization_code || "N/A"}
          </p>
          <p>
            <strong>Payment Channel:</strong> {transactionData.channel || "N/A"}
          </p>
          <p>
            <strong>Bank:</strong> {transactionData.bank || "N/A"}
          </p>
          {/* <p>
                  <strong>Payment Date:</strong>{" "}
                  {transactionData.paid_at
                    ? new Date(transactionData.paid_at).toLocaleString()
                    : "N/A"}
                </p> */}
        </div>

        {/* Customer Information Section */}
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="mb-1 text-lg font-semibold">Customer Information</h3>
          <p>
            <strong>Account Name:</strong>{" "}
            {transactionData?.account_name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {transactionData.customer?.email || "N/A"}
          </p>

          <p>
            <strong>Customer code:</strong>{" "}
            {transactionData.customer?.code || "N/A"}
          </p>
        </div>
      </div>

      {/* Additional Details */}
      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="mb-1 text-lg font-semibold">Additional Details</h3>
        {/* <p>
                <strong>Transaction Fees:</strong> ₦
                {transactionData.fees ? transactionData.fees / 100 : "N/A"}
              </p> */}
        <p>
          <strong>Card Type:</strong> {transactionData.card_type || "N/A"}
        </p>
        <p>
          <strong>Reusable:</strong> {transactionData.reusable ? "Yes" : "No"}
        </p>
        <p>
          <strong>Signature:</strong> {transactionData.signature}
        </p>
      </div>
    </div>
  );
}

export default RenderAuthContent;
