import { createBrowserRouter } from "react-router-dom";
import LoginCard from "../components/FormCard";
import ErrorPage from "../pages/ErrorPage";
import AuthStatus from "./AuthStatus";

const routes = [
  {
    path: "/",
    element: <LoginCard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "auth-status",
    element: <AuthStatus />,
  },
];
const router = createBrowserRouter(routes);
export default router;
