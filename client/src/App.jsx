import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/pages/Authentication/Signup";
import Login from "./components/pages/Authentication/Login";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Settings from "./components/pages/Settings/Settings";
import QuizDetails from "./components/pages/Settings/QuizDetails";
import Quiz from "./components/pages/Quiz/Quiz";

function App() {
  return (
    <Routes>
      {/* <Signup /> */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/:quizId" element={<QuizDetails />} />
      <Route path="/quiz/:quizId" element={<Quiz />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
}

export default App;
