import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { FormProvider, useForm, Controller } from "react-hook-form";

import image3 from "/images/img3.png";
import InputField from "../components/InputField";
import CustomButton from "../components/Button";
import EmailInput from "../components/EmailInput";
function SignUp() {
  const methods = useForm({
    mode: "onChange",
    defaultValues: { gender: "" },
  });
  let submitRegisterForm = (data) => {
    console.log(data);
  };
  const validatePdfFile = (file) => {
    if (!file || file.type !== "application/pdf") {
      methods.setError("bank_statement", {
        type: "manual",
        message: "Only PDF files are allowed",
      });
      return false;
    }
    methods.clearErrors("bank_statement");
    return true;
  };
  return (
    <div className="flex h-dvh w-dvw">
      <div className="hidden flex-col items-center justify-center bg-green-50 p-4 md:flex md:w-1/2">
        <div>
          <Typography
            variant="h4"
            className="text-lg font-semibold md:text-xl lg:text-2xl"
          >
            Life is so much easier{" "}
          </Typography>
          <Typography
            variant="lead"
            className="text-sm text-gray-700 md:text-base lg:text-lg"
          >
            With EasyLyf card
          </Typography>
        </div>
        <div className="flex h-[70%] w-full justify-center">
          <img
            src={image3}
            alt=""
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 md:w-1/2">
        <div className="w-full max-w-md sm:w-[22rem] md:w-[26rem] lg:w-[30rem]">
          <div className="mb-3 text-center">
            <Typography className="text-lg font-medium text-gray-600 sm:text-sm md:text-xl lg:text-2xl">
              Welcome to EasyLyf Card
            </Typography>
            <Typography
              variant="lead"
              className="text-sm text-gray-600 sm:text-base md:text-lg"
            >
              Tell us a little about you
            </Typography>
          </div>
          <Card className="w-full max-w-md p-4 sm:w-[24rem] md:w-[28rem] lg:w-[32rem]">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(submitRegisterForm)}>
                <CardBody className="flex flex-col gap-4 p-2">
                  <InputField
                    label="First Name"
                    inputName="firstName"
                    validationRule={{
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message:
                          "First name must be at least 2 characters long",
                      },
                    }}
                  />
                  <InputField
                    label="Last Name"
                    inputName="lastName"
                    validationRule={{
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "last name must be at least 2 characters long",
                      },
                    }}
                  />

                  <EmailInput />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    inputName="phoneNumber"
                    validationRule={{
                      required: "Phone number is required",
                      minLength: 6,
                      maxLength: 12,
                    }}
                  />
                  <div>
                    <Controller
                      name="gender"
                      control={methods.control}
                      rules={{ required: "Gender is required" }}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <Select
                            animate={{
                              mount: { y: 0 },
                              unmount: { y: 25 },
                            }}
                            label="Gender"
                            {...field}
                            onChange={(value) => field.onChange(value)}
                          >
                            <Option value="">Select a gender</Option>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                          </Select>
                          {error && (
                            <p className="text-xs text-red-500">
                              {error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div>
                    <InputField
                      accept="application/pdf"
                      className="w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border file:border-green-500 file:bg-green-50 file:px-2 file:py-1 file:text-green-700 hover:file:bg-green-100 hover:file:text-green-900"
                      type="file"
                      label="Bank statement"
                      inputName="bank_statement"
                      validationRule={{
                        required: "Bank statement is required",
                        validate: (value) => {
                          let file = value[0];
                          return validatePdfFile(file) || "Invalid file type.";
                        },
                      }}
                    />
                  </div>
                </CardBody>
                <CardFooter className="p-2">
                  <CustomButton
                    ButtonText="Proceed"
                    isDisabled={!methods.formState.isValid}
                  />
                </CardFooter>
              </form>
            </FormProvider>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
