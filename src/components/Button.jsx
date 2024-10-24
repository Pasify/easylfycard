import { Button } from "@material-tailwind/react";
import testAPI from "../../api/hello";
import initializeDirectDebit from "../services/initDD";
import handler from "../services/sayhello";

function CustomButton() {
  const testCase = () => {
    initializeDirectDebit();
    console.log(`working`);
  };
  return (
    <div>
      <Button
        variant="gradient"
        color="green"
        onClick={() => console.log("hek")}
        fullWidth
      >
        Click Me
      </Button>
    </div>
  );
}

export default CustomButton;
