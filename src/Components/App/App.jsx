import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Landing from "../Landing/Landing";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import * as auth from "../../utils/auth";
import { getToken, handleToken } from "../../utils/token";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenModal = (modal) => setActiveModal(modal);
  const handleCloseModal = () => setActiveModal("");

  const handleLogin = (email, password) => {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          handleToken(data.token);
          return auth.getUserData(data.token);
        }
        return Promise.reject(new Error(data.message || "Login failed"));
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleCloseModal();
        navigate("/profile");
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegistration = ({ user }) => {
    const { name, email, password } = user;
    auth
      .register({ name, email, password })
      .then((res) => {
        if (res.email) {
          handleLogin(email, password);
        } else {
          setIsLoading(false);
          console.error(res.message || "Registration failed");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  const handleSignOut = () => {
    handleToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      auth
        .getUserData(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          navigate("/profile");
        })
        .catch(() => handleToken());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/profile" />
            ) : (
              <Landing onOpenModal={handleOpenModal} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile currentUser={currentUser} onSignOut={handleSignOut} />
            </ProtectedRoute>
          }
        />
      </Routes>
      {activeModal === "login" && (
        <LoginModal
          modalName="login"
          isOpen={activeModal === "login"}
          closeActiveModal={handleCloseModal}
          handleLogin={handleLogin}
          setActiveModal={setActiveModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          modalName="register"
          isOpen={activeModal === "register"}
          closeActiveModal={handleCloseModal}
          onRegistration={handleRegistration}
          onLogin={handleLogin}
          setActiveModal={setActiveModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}

export default App;
