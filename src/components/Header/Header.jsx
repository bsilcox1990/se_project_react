import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar-placeholder.svg";
import hoverAvatar from "../../assets/hover-avatar-placeholder.svg";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__content-left">
        <img src={logo} alt="wtwr logo" className="header__logo" />
        <p className="header__date">{currentDate}, New York</p>
      </div>
      <div className="header__content-right">
        <button className="header__button">+ Add clothes</button>
        <p className="header__user-name">Terrence Tegegne</p>
      </div>
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
    </header>
  );
}

export default Header;
