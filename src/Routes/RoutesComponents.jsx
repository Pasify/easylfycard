import { createBrowserRouter } from "react-router-dom";
import Authorize from "../pages/Authorize";
import ErrorPage from "../pages/ErrorPage";
import ThankYou from "./ThankYou";
import ChargeAccount from "../pages/ChargeAccount";
import VerifyTransaction from "../pages/VerifyTransaction";
import Register from "../pages/Register";

const routes = [
  {
    path: "/",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "authorize",
    element: <Authorize />,
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
