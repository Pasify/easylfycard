import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import CustomButton from "../components/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import chargeAccount from "../services/chargeAccount";
import toast from "react-hot-toast";
import InputField from "../components/InputField";

function ChargeAccount() {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({ mode: "onChange" });
  const submitForm = async (values) => {
    // console.log(values);
    const toastid = toast.loading("Debiting account...");
    setIsLoading(true);
    try {
      const result = await chargeAccount(values);
      if (result.success) {
        toast.success("Account debited successfully!", {
          id: toastid,
        });
      } else {
        if (result.type === "validation_error") {
          toast.error(`validation error, ${result.message}`, {
            id: toastid,
          });
        } else if (result.type === "network_error") {
          toast.error(
            "Network Error: Unable to process request. Please try again.",
            { id: toastid }
          );
        } else {
          toast.error("An unknown error occurred. Please try again.", {
            id: toastid,
          });
        }
      }
    } catch (error) {
      toast.error("Failed to Debit Account, Please try again", {
        id: toastid,
      });
    } finally {
      setIsLoading(false);
      methods.reset();
    }
  };
  useEffect(() => {
    document.title = "Perform Debit";
  }, []);
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
          Debit Account
        </Typography>
      </CardHeader>
      <FormProvider {...methods}>
        <form action="" onSubmit={methods.handleSubmit(submitForm)}>
          <CardBody className="flex flex-col gap-4">
            <InputField
              label="Authorization code"
              type="text"
              inputName="authorization_code"
              validationRule={{
                required: "Authorization code is required",
                minLength: {
                  value: 6,
                  message:
                    "Authorization code must be at least 6 characters long",
                },
              }}
            />

            <InputField
              label="Amount"
              type="number"
              inputName="amount"
              validationRule={{
                required: "Amount is required",
                min: {
                  value: 100,
                  message: "Amount must be at least ₦100",
                },
                max: {
                  value: 1000,
                  message: "Amount must be less than ₦1000",
                },
              }}
            />

            <InputField
              label="Linked Email Address"
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
          <CardFooter className="pt-0">
            <CustomButton
              ButtonText="Debit"
              isDisabled={!methods.formState.isValid}
              isLoading={isLoading}
            />
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}

export default ChargeAccount;
