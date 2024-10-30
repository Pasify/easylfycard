import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import router from "./Routes/RoutesComponents";
import "./App.css";

function App() {
  return (
    <div className="bg-background flex justify-center items-center min-h-screen p-4 ">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
