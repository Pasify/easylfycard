import testAPI from "../../api/hello";
import initializeDD from "../services/initDD";
import handler from "../services/sayhello";

function Button() {
  const testCase = () => {
    // initializeDD();
    handler();
    // testAPI(); // Call the API function here
    console.log(`working`);
  };
  return (
    <div>
      <button onClick={testCase}>test</button>
    </div>
  );
}

export default Button;
