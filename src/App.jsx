import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import router from "./Routes/RoutesComponents";
import "./App.css";

function App() {
  return (
    <div className="flex h-dvh items-center justify-center overflow-auto bg-background">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
