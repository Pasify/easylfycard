import { Toaster } from "react-hot-toast";

import LoginCard from "./components/FormCard";

import "./App.css";


function App() {
  return (
    <div className="bg-background flex justify-center items-center min-h-screen p-4 ">
      <LoginCard />
      <Toaster />
    </div>
  );
}

export default App;
