import { useState } from "react";
import toast from "react-hot-toast";
import { initializeDirectDebit } from "../services";
import { FormProvider, useForm } from "react-hook-form";
import { MdInfo } from "react-icons/md";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import CustomButton from "../components/Button";
import InputField from "../components/InputField";

export default function Authorize() {
  const [isLoading, setIsLoading] = useState(false);

  let methods = useForm({ mode: "onChange" });

  const onSubmitForm = async (data) => {
    if (isLoading) return;
    const toastId = toast.loading("initializing Direct Debit...");
    setIsLoading(true);
    try {
      let { email } = data || {};
      if (email) {
        await initializeDirectDebit(email);
        toast.success(
          "Direct Debit initialized successfully! Redirecting to Paystack...",
          {
            id: toastId,
          },
        );
      }
    } catch (error) {
      toast.error("Failed to initialize Direct Debit. Try again.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
    // console.log(data);
  };
  return (
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
          Easy Life Card
        </Typography>
      </CardHeader>

      <FormProvider {...methods}>
        <form action="" onSubmit={methods.handleSubmit(onSubmitForm)}>
          <CardBody className="flex flex-col gap-4">
            <InputField
              label="Email Address"
              type="email"
              inputName="email"
              validationRule={{
                required: "Email Address is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/i,
                  message: "Please enter a valid email address",
                },
              }}
            />
          </CardBody>
          <CardFooter className="flex flex-col gap-4 pt-0">
            <CustomButton
              isDisabled={!methods.formState.isValid}
              isLoading={isLoading}
              ButtonText="Authorize"
            />
            <div className="flex items-start gap-2 rounded-lg bg-gray-200 p-4">
              <MdInfo className="flex-shrink-0 text-lg" />
              <Typography
                color="inherit"
                className="text-xs leading-tight text-gray-600 sm:text-sm"
              >
                You will need to transfer ₦50 to the NIBSS account to complete
                the linkage, enabling repayment. Only salary accounts can be
                linked
              </Typography>
            </div>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
