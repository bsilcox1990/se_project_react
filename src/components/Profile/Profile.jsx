import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ onCardClick, handleAddModal, garments }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes">
        <div className="profile__heading">
          <p className="profile__text">Your Items</p>
          <button
            type="button"
            className="profile__add-button"
            onClick={handleAddModal}
          >
            + Add new
          </button>
        </div>
        <ClothesSection onCardClick={onCardClick} garments={garments} />
      </section>
    </div>
  );
}

export default Profile;
