import { useLocation } from "react-router-dom";

function AuthStatus() {
  const location = useLocation();
  //   const queryParam = new URLSearchParams(location.search);
  //   console.log(location);
  //   console.log(queryParam);
  //   const reference = queryParam.get("reference");
  //   console.log(reference);
  return (
    <div>
      <h1>Thank you</h1>
    </div>
  );
}

export default AuthStatus;
