import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "../Landing/Landing";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import CharacterSheet from "../CharacterSheet/CharacterSheet";
import DiceRoller from "../DiceRoller/DiceRoller";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import * as auth from "../../utils/auth";
import { getToken, handleToken } from "../../utils/token";
import { CharacterProvider } from "../../contexts/CharacterContext";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const [diceRollerData, setDiceRollerData] = useState(null);

  const handleOpenModal = (modal, data = null) => {
    setActiveModal(modal);
    if (modal === "dice" && data) setDiceRollerData(data);
  };
  const handleCloseModal = () => {
    setActiveModal("");
    setDiceRollerData(null);
  };

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
        navigate("/characters");
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
        })
        .catch(() => handleToken());
    }
  }, []);

  return (
    <CharacterProvider isLoggedIn={isLoggedIn}>
      <Header 
        isLoggedIn={isLoggedIn} 
        onOpenModal={handleOpenModal} 
        onSignOut={handleSignOut} 
      />
      <div className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <Landing 
                isLoggedIn={isLoggedIn} 
                onOpenModal={handleOpenModal} 
              />
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
          <Route
            path="/characters"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/characters/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CharacterSheet onOpenModal={handleOpenModal} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dice"
            element={
              <DiceRoller />
            }
          />
        </Routes>
      </div>
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
      {activeModal === "dice" && (
        <div className="modal">
          <div className="modal__container modal__container_size_large">
            <button className="modal__close btn_icon-only" onClick={handleCloseModal}>&times;</button>
            <DiceRoller 
              isModal={true} 
              onClose={handleCloseModal} 
              initialData={diceRollerData}
            />
          </div>
        </div>
      )}
    </CharacterProvider>
  );
}

export default App;
