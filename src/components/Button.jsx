import { Button } from "@material-tailwind/react";
import Loader from "./Loader";

function CustomButton({ isDisabled, isLoading, ButtonText }) {
  return (
    <div>
      <Button
        variant="gradient"
        color="green"
        fullWidth
        // onClick={() => handleClick()}
        type="submit"
        disabled={isDisabled}
      >
        {isLoading ? <Loader /> : <span>{ButtonText}</span>}
      </Button>
    </div>
  );
}

export default CustomButton;
