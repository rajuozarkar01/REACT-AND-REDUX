import styles from "./Item.module.css";
const Item = ({ foodItem, handleBuyButton }) => {
  
  return (
    <li className="dynamic list-group-item">
      <span className="rj-span">{foodItem}</span>
      <button
        className={`${styles.button} btn btn-info`}
        onClick={handleBuyButton}
      >
        Buy
      </button>
    </li>
  );
};

export default Item;
