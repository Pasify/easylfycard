import { createBrowserRouter } from "react-router-dom";
import LoginCard from "../components/FormCard";
import ErrorPage from "../pages/ErrorPage";
import ThankYou from "./ThankYou";
import ChargeAccount from "../pages/ChargeAccount";
import VerifyTransaction from "../pages/VerifyTransaction";

const routes = [
  {
    path: "/",
    element: <LoginCard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "thank-you",
    element: <ThankYou />,
  },
  {
    path: "charge",
    element: <ChargeAccount />,
  },
  {
    path: "verify",
    element: <VerifyTransaction />,
  },
];
const router = createBrowserRouter(routes);
export default router;
