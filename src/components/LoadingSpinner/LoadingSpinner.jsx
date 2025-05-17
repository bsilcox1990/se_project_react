import { ClipLoader } from "react-spinners";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="loading-spinner__container">
      <ClipLoader color="#3498db" size={50} />
    </div>
  );
}

export default LoadingSpinner;
