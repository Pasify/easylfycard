import { useState } from "react";
import toast from "react-hot-toast";
import initializeDirectDebit from "../services/initDD";
import { useForm } from "react-hook-form";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import CustomButton from "./Button";

export default function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
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

      <form action="" onSubmit={handleSubmit(onSubmitForm)}>
        <CardBody className="flex flex-col gap-4">
          <input
            className="w-full border border-grey-300 bg-grey-0 rounded-sm shadow-sm px-3 py-2 caret-green-700"
            label="Email Address"
            placeholder="elon-musk@pluto.com"
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <CustomButton
            handleClick={onSubmitForm}
            isDisabled={!isValid}
            isLoading={isLoading}
          />
        </CardFooter>
      </form>
    </Card>
  );
}
