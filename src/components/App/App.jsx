import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import { getItems, addItems, deleteItem } from "../../utils/api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleAddModal = () => setActiveModal("add-garment");
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
    return addItems(newGarment)
      .then((data) => {
        setGarments((prev) => [data, ...prev]);
        closeModal();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterUser = () => {};
  const handleLogin = () => {};

  const handleCardDelete = () => {
    const filteredGarments = garments.filter((item) => {
      return item !== selectedCard;
    });
    setIsLoading(true);
    deleteItem(selectedCard._id)
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
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header weatherData={weatherData} handleAddModal={handleAddModal} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  garments={garments}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  handleAddModal={handleAddModal}
                  garments={garments}
                />
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
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
