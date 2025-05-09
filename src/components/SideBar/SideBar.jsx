import { useContext } from "react";
import avatar from "../../assets/avatar-placeholder.svg";
import hoverAvatar from "../../assets/hover-avatar-placeholder.svg";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditModal, handleLogout }) {
  const { userData } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        <img
          src={userData.avatar}
          alt="image of terrence tegegne"
          className="sidebar__avatar sidebar__avatar_default"
        />
        <img
          src={hoverAvatar}
          alt="the letter T"
          className="sidebar__avatar sidebar__avatar_hover"
        />
        <p className="sidebar__user-name">{userData.name}</p>
      </div>
      <div className="sidebar__button-container">
        <button
          type="button"
          onClick={handleEditModal}
          className="sidebar__edit-profile-btn"
        >
          Change profile data
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="sidebar__logout-btn"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
