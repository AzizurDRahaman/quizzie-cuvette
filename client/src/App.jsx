import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/pages/Authentication/Signup";

function App() {
  return (
    <Routes>
      {/* <Signup /> */}
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
}

export default App;
