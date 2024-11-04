import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";

function Modal({ transactionData }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => setIsOpen(!isOpen);
  const {
    status,
    amount,
    reference,
    paid_at,
    customer,
    channel,
    authorization,
    fees,
    gateway_response,
  } = transactionData;
  return (
    <>
      <Dialog open={isOpen} handler={handleOpen}>
        <DialogHeader>Transaction Details</DialogHeader>
        {transactionData && (
          <DialogBody>
            <h2>Transaction Details</h2>
            <p>
              Status:{" "}
              {status === "success" ? "Payment Successful" : "Payment Failed"}
            </p>
            <p>Authorization code: {authorization.authorization_code}</p>
            <p>Amount Paid: ₦{amount / 100}</p>
            <p>Transaction Reference: {reference}</p>
            <p>Payment Date: {new Date(paid_at).toLocaleString()}</p>
            <p>Customer Email: {customer.email}</p>
            {/* <p>Payment Channel: {channel}</p> */}
            <p>Bank: {authorization.bank}</p>
            <p>Transaction Fees: ₦{fees / 100}</p>
            <p>Gateway Response: {gateway_response}</p>
          </DialogBody>
        )}

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Modal;
