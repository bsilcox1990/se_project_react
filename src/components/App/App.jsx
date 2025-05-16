import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import {
  getItems,
  addItems,
  deleteItem,
  updateProfile,
  addItemLike,
  deleteItemLike,
} from "../../utils/api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { signUp, signIn, getUserInfo } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    condition: "",
    isDay: true,
    temp: { F: 57.11, C: 57.11 },
    type: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [garments, setGarments] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
    email: "",
    id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddModal = () => setActiveModal("add-garment");
  const handleRegisterModal = () => setActiveModal("register-user");
  const handleLoginModal = () => setActiveModal("login-user");
  const handleEditModal = () => setActiveModal("edit-profile");
  const closeModal = () => setActiveModal("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  const openConfirmationModal = () => {
    setActiveModal("delete");
  };

  const handleAddGarmentSubmit = (newGarment) => {
    setIsLoading(true);
    const jwt = getToken();
    return addItems(newGarment, jwt)
      .then((data) => {
        setGarments((prev) => [data.data, ...prev]);
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to add new garment:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterUser = (newUser) => {
    setIsLoading(true);
    return signUp(newUser)
      .then(() => {
        return signIn(newUser.email, newUser.password);
      })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          return getUserInfo(data.token);
        }
      })
      .then((user) => {
        setUserData(user.data);
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to register new user:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = (user) => {
    setIsLoading(true);
    if (!user.email || !user.password) {
      return;
    }
    return signIn(user.email, user.password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          return getUserInfo(data.token);
        }
      })
      .then((user) => {
        setUserData(user.data);
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to login user:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfile = (updatedInfo) => {
    const jwt = getToken();
    setIsLoading(true);
    return updateProfile(updatedInfo, jwt)
      .then(() => {
        if (jwt) {
          return getUserInfo(jwt);
        }
      })
      .then((user) => {
        setUserData(user.data);
        closeModal();
      })
      .catch((error) => {
        console.error("Failed to update profile information:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleItemLike = (card, isLiked) => {
    const jwt = getToken();

    !isLiked
      ? addItemLike(card._id, jwt)
          .then((updatedCard) => {
            setGarments((items) => {
              return items.map((item) =>
                item._id === card._id ? updatedCard.data : item
              );
            });
          })
          .catch(console.error)
      : deleteItemLike(card._id, jwt)
          .then((updatedCard) => {
            setGarments((items) => {
              return items.map((item) =>
                item._id === card._id ? updatedCard.data : item
              );
            });
          })
          .catch(console.error);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUserData({});
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    getUserInfo(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setUserData(user.data);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  const handleCardDelete = () => {
    const filteredGarments = garments.filter((item) => {
      return item !== selectedCard;
    });
    const jwt = getToken();
    setIsLoading(true);
    deleteItem(selectedCard._id, jwt)
      .then(() => {
        setGarments(filteredGarments);
        closeModal();
        setSelectedCard({});
      })
      .catch((error) => {
        console.error("Failed to delete garment:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then(({ data }) => {
        const sortedData = data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setGarments(sortedData);
      })
      .catch((error) => {
        console.error("Failed fetching garments from server:", error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ userData, isLoggedIn }}>
      <div className="page">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleAddModal={handleAddModal}
              handleRegisterModal={handleRegisterModal}
              handleLoginModal={handleLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    garments={garments}
                    onItemLike={handleItemLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddModal={handleAddModal}
                      garments={garments}
                      handleEditModal={handleEditModal}
                      handleLogout={handleLogout}
                      onItemLike={handleItemLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            activeModal={activeModal}
            isSubmitting={isLoading}
            onClose={closeModal}
            onAddGarmentSubmit={handleAddGarmentSubmit}
            buttonText={isLoading ? "Adding..." : "Add garment"}
          />
          <RegisterModal
            activeModal={activeModal}
            isSubmitting={isLoading}
            onClose={closeModal}
            onRegister={handleRegisterUser}
            handleLoginModal={handleLoginModal}
          />
          <LoginModal
            activeModal={activeModal}
            isSubmitting={isLoading}
            onClose={closeModal}
            onLogin={handleLogin}
            handleRegisterModal={handleRegisterModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeModal}
            name="preview"
            onDeleteClick={openConfirmationModal}
          />
          <DeleteConfirmationModal
            name="delete"
            activeModal={activeModal}
            onClose={closeModal}
            buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
            onCardDelete={handleCardDelete}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={closeModal}
            isSubmitting={isLoading}
            onEditProfile={handleEditProfile}
            buttonText={isLoading ? "Saving..." : "Save changes"}
          />
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
