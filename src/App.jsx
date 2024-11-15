import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import router from "./Routes/RoutesComponents";
import "./App.css";

function App() {
  return (
    <div className="bg-background flex justify-center items-center h-dvh p-4  overflow-auto">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
