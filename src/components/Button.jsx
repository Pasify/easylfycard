import { test as testAPI } from "../../api/hello";
import initializeDD from "../services/initDD";

function Button() {
  const test = () => {
    // initializeDD();
    testAPI(); // Call the API function here
    console.log(`working`);
  };
  return (
    <div>
      <button onClick={test}>test</button>
    </div>
  );
}

export default Button;
