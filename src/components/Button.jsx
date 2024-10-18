import testAPI from "../../api/hello";
import initializeDirectDebit from "../services/initDD";
import handler from "../services/sayhello";

function Button() {
  const testCase = () => {
    initializeDirectDebit();
    console.log(`working`);
  };
  return (
    <div>
      <button onClick={testCase}>test</button>
    </div>
  );
}

export default Button;
