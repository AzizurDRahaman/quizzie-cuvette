import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/pages/Authentication/Signup";
import Login from "./components/pages/Authentication/Login";

function App() {
  return (
    <Routes>
      {/* <Signup /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
}

export default App;
