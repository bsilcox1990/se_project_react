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

  console.log("value of logged in", isLoggedIn);
  console.log("value of garments", garments);
  console.log("value of user data", userData);

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
        console.log("Register user data:", user);
        setUserData(user.data);
        closeModal();
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
        console.log("Login user data:", user);
        setUserData(user.data);
        closeModal();
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
        console.log("Edit profile user data:", user);
        setUserData(user.data);
        closeModal();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleItemLike = (card) => {
    const jwt = getToken();
    !card.isLiked
      ? addItemLike(card._id, jwt)
          .then((updatedCard) => {
            console.log(
              "updated card returned from add item api call",
              updatedCard
            );
            setGarments((items) => {
              console.log("list of items inside of garments", items);
              items.map((item) => {
                console.log(
                  "each item being called on the garments array with map",
                  item
                );
                return item._id === card._id ? updatedCard : item;
              });
            });
          })
          .catch(console.error)
      : deleteItemLike(id, jwt)
          .then((updatedCard) => {
            setGarments((items) => {
              items.map((item) => (item._id === id ? updatedCard : item));
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
        console.log("Token check user data:", user);
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
      .catch(console.error)
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
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then(({ data }) => {
        setGarments(data);
      })
      .catch(console.error);
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
          />
          <RegisterModal
            activeModal={activeModal}
            isSubmitting={isLoading}
            onClose={closeModal}
            onRegister={handleRegisterUser}
          />
          <LoginModal
            activeModal={activeModal}
            isSubmitting={isLoading}
            onClose={closeModal}
            onLogin={handleLogin}
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
          />
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
