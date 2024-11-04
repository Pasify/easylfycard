import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import CustomButton from "../components/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import VerifyDDTransaction from "../services/verifyTransaction";

function VerifyTransaction() {
  const defaults = {
    status: "",
    amount: 0,
    reference: "",
    paid_at: "",
    customer: { email: "" },
    channel: "",
    authorization: {
      bank: "",
      authorization_code: "AUTH_uh8bcl3zbn",
    },
    fees: 0,
    gateway_response: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState(defaults);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });
  async function submitReferenceForm(refCode) {
    const toastId = toast.loading(`Fetching transaction details.... `);
    try {
      console.log(refCode);
      const response = await VerifyDDTransaction(refCode);
      console.log(response);
      // if (refCode) {
      //   toast.success(`reference code active ${refCode.reference}`, {
      //     id: toastId,
      //   });
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      reset();
    }
  }
  return (
    <div>
      {/* <Modal transactionData={transactionData} /> */}
      <Card className="w-full max-w-md sm:w-[24rem] md:w-[28rem] lg:w-[32rem] p-4">
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-4 grid h-20 md:h-28 lg:h-32 place-items-center"
        >
          <Typography
            variant="h3"
            color="white"
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl"
          >
            Verify Transaction
          </Typography>
        </CardHeader>
        <form action="" onSubmit={handleSubmit(submitReferenceForm)}>
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input
                containerProps={{
                  className: "caret-green-700 shadow-sm",
                }}
                label="Reference code"
                size="lg"
                {...register("reference", {
                  required: true,
                })}
              />
              {errors.reference_code && (
                <p className="text-red-500 text-sm">
                  {errors.reference.message}
                </p>
              )}
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <CustomButton
              ButtonText="Verify"
              isDisabled={!isValid}
              isLoading={isLoading}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default VerifyTransaction;
