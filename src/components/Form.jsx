import { Input } from "@material-tailwind/react";
import CustomButton from "./Button";

function Form() {
  return (
    <div className="flex w-[50%] items-center justify-center gap-6 bg-white rounded-sm py-[30px]  px-[35px]  shadow-default">
      <form className="flex flex-col  gap-6  py-[30px] px-[35px]">
        <div>
          <Input type="email" label="Email address" />
        </div>
        <CustomButton />
      </form>
    </div>
  );
}

export default Form;
