import { useState } from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FormProvider, useForm } from "react-hook-form";

import CustomButton from "../components/Button";
// import Modal from "../components/Modal";
import InputField from "../components/InputField";
import verifyChargeTransaction from "../services/verifyCharge";

function VerifyCharge() {
  const [transactionData, setTransactionData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm({ mode: "onChange" });

  async function submitReference(refCode) {
    try {
      const toastId = toast.loading("Fetching Transaction details...");
      console.log(refCode);
      const response = await verifyChargeTransaction(refCode.reference);
      if (response) {
        console.log(`response received:`, response);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      methods.reset();
    }
  }
  return (
    <div>
      <Card className="w-full max-w-md p-4 sm:w-[24rem] md:w-[28rem] lg:w-[32rem]">
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-4 grid h-20 place-items-center md:h-28 lg:h-32"
        >
          <Typography
            variant="h3"
            color="white"
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl"
          >
            Verify Transaction
          </Typography>
        </CardHeader>
        <FormProvider {...methods}>
          {" "}
          <form action="" onSubmit={methods.handleSubmit(submitReference)}>
            <CardBody className="flex flex-col gap-4">
              <InputField
                label="Transaction Reference"
                inputName="reference"
                validationRule={{
                  required: true,
                }}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <CustomButton
                ButtonText="Verify"
                isDisabled={!methods.formState.isValid}
                isLoading={methods.formState.isSubmitted}
              />
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}

export default VerifyCharge;
