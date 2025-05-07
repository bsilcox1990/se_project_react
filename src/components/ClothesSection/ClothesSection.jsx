import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, garments }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes">
      <ul className="cards__list">
        {garments
          .filter((item) => {
            return item.owner === currentUser.user.data._id;
          })
          .map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
