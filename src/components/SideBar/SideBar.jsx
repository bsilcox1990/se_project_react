import avatar from "../../assets/avatar-placeholder.svg";
import hoverAvatar from "../../assets/hover-avatar-placeholder.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        <img
          src={avatar}
          alt="image of terrence tegegne"
          className="sidebar__avatar sidebar__avatar_default"
        />
        <img
          src={hoverAvatar}
          alt="the letter T"
          className="sidebar__avatar sidebar__avatar_hover"
        />
      </div>
      <p className="sidebar__user-name">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
