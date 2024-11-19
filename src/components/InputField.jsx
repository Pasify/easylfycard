import { Input } from "@material-tailwind/react";
import { useFormContext } from "react-hook-form";
function InputField({ label, type = "text", inputName, validationRule }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <Input
        containerProps={{
          className: "shadow-sm caret-green-700",
        }}
        type={type}
        label={label}
        size="lg"
        {...register(inputName, validationRule)}
      />
      {errors[inputName] && (
        <p className="text-xs text-red-500">{errors[inputName].message}</p>
      )}
    </div>
  );
}

export default InputField;
