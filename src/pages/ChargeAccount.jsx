import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import CustomButton from "../components/Button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import chargeAccount from "../services/chargeAccount";
import toast from "react-hot-toast";

function ChargeAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const submitForm = async (values) => {
    // Implement your logic to submit the form data here
    const toastid = toast.loading("Debiting account...");
    console.log(values);
    setIsLoading(true);
    try {
      await chargeAccount(values);
      toast.success("Account debited successfully!", {
        id: toastid,
      });
    } catch (error) {
      toast.error("Failed to Debit Account, Please try again", {
        id: toastid,
      });
    } finally {
      setIsLoading(false);
    }
    // reset();
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
      <form action="" onSubmit={handleSubmit(submitForm)}>
        <CardBody className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Input
              label="Authorization code"
              size="lg"
              {...register("authorization_code", {
                required: "Authorization code is required",
                minLength: {
                  value: 6,
                  message:
                    "Authorization code must be at least 6 characters long",
                },
              })}
              defaultValue="AUTH_rZXeIG72j0"
              containerProps={{
                className: "caret-green-700 shadow-sm",
              }}
            />
            {errors.authorization_code && (
              <p className="text-red-500 text-sm">
                {errors.authorization_code.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Input
              defaultValue={1000}
              label="Amount"
              size="lg"
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: 100,
                  message: "Amount must be at least ₦100",
                },
                max: {
                  value: 1000,
                  message: "Amount must be less than ₦1000",
                },
              })}
              containerProps={{
                className: "caret-green-700 shadow-sm",
              }}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Input
              defaultValue="ese.akposibruke@yahoo.com"
              label="Linked Email Address"
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/i,
                  message: "Please enter a valid email address",
                },
              })}
              containerProps={{
                className: "caret-green-700 shadow-sm",
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <CustomButton
            ButtonText="Debit"
            isDisabled={!isValid}
            isLoading={isLoading}
          />
        </CardFooter>
      </form>
    </Card>
  );
}

export default ChargeAccount;
