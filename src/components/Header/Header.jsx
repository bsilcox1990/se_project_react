import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import menuIcon from "../../assets/mobile-menu-button.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddModal,
  weatherData,
  handleRegisterModal,
  handleLoginModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { userData, isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();
  const isProfileRoute = location.pathname.startsWith("/profile");
  const isHomeRoute = location.pathname === "/";

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpened(!isMobileMenuOpened);
  const [value, setValue] = useState(false);

  const [imageFailed, setImageFailed] = useState(false);
  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  useEffect(() => {
    setImageFailed(false);
  }, [userData.avatar]);

  return (
    <header className={`header ${isProfileRoute ? "header_type_profile" : ""}`}>
      <div
        className={`header__info-container ${
          isProfileRoute ? "header__info-container_type_profile" : ""
        }`}
      >
        <Link to="/">
          <img src={logo} alt="wtwr logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div
        className={`header__user-container ${
          isMobileMenuOpened ? `header__user-container_open` : ""
        } ${isHomeRoute ? "header__user-container_type_home" : ""}`}
      >
        <ToggleSwitch isOn={value} handleToggle={() => setValue(!value)} />

        {isLoggedIn ? (
          <>
            <button
              type="button"
              onClick={handleAddModal}
              className="header__button"
            >
              + Add clothes
            </button>
            <Link to="/profile">
              <div className="header__user-info">
                <p className="header__user-name" title={userData.name}>
                  {userData.name}
                </p>
                <div className="header__avatar-container">
                  {userData.avatar && !imageFailed ? (
                    <img
                      src={userData.avatar}
                      alt="User profile picture"
                      className="header__avatar header__avatar_default"
                      onError={() => setImageFailed(true)}
                    />
                  ) : (
                    <div className="header__avatar header__avatar_default header__avatar_letter">
                      {getFirstLetter(userData.name)}
                    </div>
                  )}
                  <div className="header__avatar header__avatar_hover header__avatar_letter">
                    {getFirstLetter(userData.name)}
                  </div>
                </div>
              </div>
            </Link>
          </>
        ) : (
          <div className="header__button-container">
            <button
              type="button"
              onClick={handleRegisterModal}
              className="header__register-button"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={handleLoginModal}
              className="header__login-button"
            >
              Log in
            </button>
          </div>
        )}
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
