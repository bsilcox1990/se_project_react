import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, garments, onItemLike }) {
  const { userData } = useContext(CurrentUserContext);

  return (
    <div className="clothes">
      <ul className="cards__list">
        {garments
          .filter((item) => {
            return item.owner === userData._id;
          })
          .map((item) => {
            return (
              <ItemCard
                onItemLike={onItemLike}
                key={item._id}
                item={item}
                onCardClick={onCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
