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
import { useEffect } from "react";

function ChargeAccount() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const submitForm = (values) => {
    // Implement your logic to submit the form data here
    console.log(values);

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
              // defaultValue="AUTH_rZXeIG72j0"
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
          <CustomButton ButtonText="Debit" isDisabled={!isValid} />
        </CardFooter>
      </form>
    </Card>
  );
}

export default ChargeAccount;
