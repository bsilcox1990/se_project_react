import "./ItemCard.css";
import defaultLike from "../../assets/like-button-default.svg";

function ItemCard({ item, onCardClick, onItemLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    console.log("value of item being passed to like", item);
    onItemLike(item);
  };

  return (
    <li className="card">
      <div>
        <h2 className="card__title">{item.name}</h2>
        <button
          onClick={handleLike}
          type="button"
          className="card__like-button"
        >
          <img src={defaultLike} alt="" />
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
