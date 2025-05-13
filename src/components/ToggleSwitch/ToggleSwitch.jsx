import { useContext } from "react";
import { useLocation } from "react-router-dom";
import "./ToggleSwitch.css";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

function ToggleSwitch({ isOn, handleToggle }) {
  const { handleToggleSwitchChange } = useContext(CurrentTempUnitContext);
  const location = useLocation();
  const isProfileRoute = location.pathname.startsWith("/profile");
  return (
    <div
      style={{ display: "flex" }}
      className={`${isProfileRoute ? "toggle-switch_hidden" : ""}`}
    >
      <input
        checked={isOn}
        onChange={() => {
          handleToggle();
          handleToggleSwitchChange();
        }}
        id="toggle-switch"
        className="toggle-switch"
        type="checkbox"
      />
      <label htmlFor="toggle-switch" className="toggle-switch__label">
        <span className="toggle-switch__fahrenheit">F</span>
        <span className="toggle-switch__celcius">C</span>
        <span className="toggle-switch__button"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;
