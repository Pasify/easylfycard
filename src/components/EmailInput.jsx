import InputField from "./InputField";

function EmailInput() {
  return (
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
  );
}

export default EmailInput;
