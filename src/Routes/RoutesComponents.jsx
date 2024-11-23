import { createBrowserRouter } from "react-router-dom";
import Authorize from "../pages/Authorize";
import ErrorPage from "../pages/ErrorPage";
import ThankYou from "./ThankYou";
import ChargeAccount from "../pages/ChargeAccount";

import Register from "../pages/Register";
import VerifyAuthorization from "../pages/VerifyAuthorization";

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
    path: "verify-authorization",
    element: <VerifyAuthorization />,
  },
];
const router = createBrowserRouter(routes);
export default router;
