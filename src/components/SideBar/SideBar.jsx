import { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditModal, handleLogout }) {
  const { userData } = useContext(CurrentUserContext);

  const [imageFailed, setImageFailed] = useState(false);
  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  useEffect(() => {
    setImageFailed(false);
  }, [userData.avatar]);

  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        {userData.avatar && !imageFailed ? (
          <img
            src={userData.avatar}
            alt="image of terrence tegegne"
            className="sidebar__avatar sidebar__avatar_default"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar_default sidebar__avatar_letter">
            {getFirstLetter(userData.name)}
          </div>
        )}
        <div className="sidebar__avatar sidebar__avatar_hover sidebar__avatar_letter">
          {getFirstLetter(userData.name)}
        </div>
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
