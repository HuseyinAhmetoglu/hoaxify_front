import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import UserSignUpPage from "./pages/UserSignUpPage";
import ApiProgress from "./shared/ApiProgress";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<UserSignUpPage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
