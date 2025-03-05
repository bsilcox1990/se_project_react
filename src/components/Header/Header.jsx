import { useState } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar-placeholder.svg";
import hoverAvatar from "../../assets/hover-avatar-placeholder.svg";
import menuIcon from "../../assets/mobile-menu-button.png";

function Header({ handleAddModal, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpened(!isMobileMenuOpened);

  return (
    <header className="header">
      <div className="header__info-container">
        <img src={logo} alt="wtwr logo" className="header__logo" />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div
        className={`header__user-container ${
          isMobileMenuOpened ? `header__user-container_open` : ""
        }`}
      >
        <button
          type="button"
          onClick={handleAddModal}
          className="header__button"
        >
          + Add clothes
        </button>
        <div className="header__user-info">
          <p className="header__user-name">Terrence Tegegne</p>
          <div className="header__avatar-container">
            <img
              src={avatar}
              alt="image of terrence tegegne"
              className="header__avatar header__avatar_default"
            />
            <img
              src={hoverAvatar}
              alt="the letter T"
              className="header__avatar header__avatar_hover"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="header__menu-button"
        onClick={toggleMobileMenu}
      >
        <img src={menuIcon} alt="menu icon" className="header__menu-icon" />
      </button>
      <button
        onClick={toggleMobileMenu}
        type="button"
        className={`header__close-button ${
          isMobileMenuOpened ? `header__close-button_open` : ""
        }`}
      />
    </header>
  );
}

export default Header;
