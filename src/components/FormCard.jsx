import { useState } from "react";
import toast from "react-hot-toast";
import initializeDirectDebit from "../services/initDD";
import { FormProvider, useForm } from "react-hook-form";
import { MdInfo } from "react-icons/md";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import CustomButton from "./Button";
import InputField from "./InputField";

export default function LoginCard() {
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
          }
        );
      }
    } catch (error) {
      toast.error("Failed to initialize Direct Debit. Try again.", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };
  return (
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
          <CardFooter className="pt-0 flex flex-col gap-4">
            <CustomButton
              isDisabled={!methods.formState.isValid}
              isLoading={isLoading}
              ButtonText="Authorize"
            />
            <div className="flex gap-2 items-start p-4 bg-gray-200 rounded-lg">
              <MdInfo className=" text-lg flex-shrink-0" />
              <Typography
                color="inherit"
                className="text-xs sm:text-sm leading-tight text-gray-600"
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
