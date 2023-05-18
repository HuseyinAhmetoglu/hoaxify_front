import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import UserSignUpPage from "./pages/UserSignUpPage";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
    };
  });

  return (
    <div>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
          {!isLoggedIn && <Route path="/signup" element={<UserSignUpPage />} />}
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
