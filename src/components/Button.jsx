import { Button } from "@material-tailwind/react";
import Loader from "./Loader";

function CustomButton({ handleClick, isDisabled, isLoading }) {
  return (
    <div>
      <Button
        variant="gradient"
        color="green"
        fullWidth
        onClick={() => handleClick()}
        type="submit"
        disabled={isDisabled}
      >
        {isLoading ? <Loader /> : <span>Authorize</span>}
      </Button>
    </div>
  );
}

export default CustomButton;
