import test from "../../api/hello";
import initializeDD from "../services/initDD";

function Button() {
  const test = () => {
    initializeDD();
    console.log(`working`);
  };
  return (
    <div>
      <button onClick={test}>test</button>
    </div>
  );
}

export default Button;
