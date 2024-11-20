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
      methods.setError("pdfUpload", {
        type: "manual",
        message: "Only PDF files are allowed",
      });
      return false;
    }
    methods.clearErrors("pdfUpload");
    return true;
  };
  return (
    <div className="flex h-dvh w-dvw">
      <div className="flex flex-1 basis-[calc(50%-16px)] flex-col items-center justify-center bg-green-50 p-4">
        <div>
          <Typography variant="h4">Life is easier With </Typography>
          <Typography variant="lead">EasyLyf Payment card</Typography>
        </div>
        <div className="h-[70%]">
          <img src={image3} alt="" className="size-full object-contain" />
        </div>
      </div>
      <div className="flex flex-1 basis-[calc(50%-16px)] items-center justify-center">
        <div>
          <div className="mb-3 text-center">
            <Typography className="text-lg text-gray-600 sm:text-xl md:text-xl lg:text-2xl">
              Welcome to EasyLyf Card
            </Typography>
          </div>
          <Card className="w-full max-w-md p-4 sm:w-[24rem] md:w-[28rem] lg:w-[32rem]">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(submitRegisterForm)}>
                <CardBody className="flex flex-col gap-4 p-2">
                  <div className="flex justify-center gap-2">
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
                          message:
                            "last name must be at least 2 characters long",
                        },
                      }}
                    />
                  </div>

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
                      inputName="pdfFile"
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
