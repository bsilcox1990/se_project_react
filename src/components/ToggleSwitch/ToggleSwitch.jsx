import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

function ToggleSwitch({ isOn, handleToggle }) {
  const { handleToggleSwitchChange } = useContext(CurrentTempUnitContext);

  return (
    <>
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
    </>
  );
}

export default ToggleSwitch;
