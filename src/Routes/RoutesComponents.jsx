import { createBrowserRouter } from "react-router-dom";
import LoginCard from "../components/FormCard";
import ErrorPage from "../pages/ErrorPage";
import ThankYou from "./ThankYou";

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
];
const router = createBrowserRouter(routes);
export default router;
