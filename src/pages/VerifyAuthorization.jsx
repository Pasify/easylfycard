import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { FormProvider, useForm } from "react-hook-form";
import CustomButton from "../components/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import VerifyDDTransaction from "../services/verifyAuth";
import InputField from "../components/InputField";

function VerifyAuthorization() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm({ mode: "onChange" });
  async function submitReferenceForm(refCode) {
    // console.log(refCode);
    const toastId = toast.loading(`Fetching transaction details.... `);
    setIsLoading(true);
    try {
      const response = await VerifyDDTransaction(refCode.reference);
      if (response.data.status) {
        toast.success(`Transaction status: ${response.data.data.status}`, {
          id: toastId,
        });
      }
      if (response) {
        setIsOpen(true);
        setTransactionData(response.data);
      }

      // if (refCode) {
      //   toast.success(`reference code active ${refCode.reference}`, {
      //     id: toastId,
      //   });
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      methods.reset();
    }
  }
  return (
    <div>
      {transactionData && (
        <Modal
          transactionData={transactionData}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}

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
          <form action="" onSubmit={methods.handleSubmit(submitReferenceForm)}>
            <CardBody className="flex flex-col gap-4">
              <InputField
                label="Reference code"
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
                isLoading={isLoading}
              />
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}

export default VerifyAuthorization;
