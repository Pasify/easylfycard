import { useState } from "react";
import LoginCard from "./components/FormCard";

import "./App.css";

import Form from "./components/Form";

function App() {
  return (
    <div className="bg-background flex justify-center items-center h-dvh  ">
      {/* <Form /> */}
      <LoginCard />
    </div>
  );
}

export default App;
