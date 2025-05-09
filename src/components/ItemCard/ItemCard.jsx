import { useContext } from "react";
import "./ItemCard.css";
import defaultLike from "../../assets/like-button-default.svg";
import activeLike from "../../assets/like-button-liked.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onItemLike }) {
  const { userData } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === userData._id);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    console.log("value of item being passed to like", item);
    onItemLike(item, isLiked);
  };

  return (
    <li className="card">
      <div className="card__title-container">
        <h2 className="card__title">{item.name}</h2>

        <button
          onClick={handleLike}
          type="button"
          className="card__like-button"
        >
          <img
            className="card__like-image"
            src={isLiked ? activeLike : defaultLike}
            alt="picture of a heart"
          />
        </button>
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
