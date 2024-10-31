import { useLocation } from "react-router-dom";

function ThankYou() {
  const location = useLocation();
 
  return (
    <div>
      <h1>Thank you</h1>
    </div>
  );
}

export default ThankYou;
