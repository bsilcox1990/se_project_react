import avatar from "../../assets/avatar-placeholder.svg";
import "./Sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="picture of terrence" className="sidebar__avatar" />
      <p className="sidebar__user-name">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
