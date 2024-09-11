// import styles from "./Item.module.css";
const Item = ({ foodItem }) => {
  return (
    <li className="dynamic list-group-item">
      <span className="rj-span">{foodItem}</span>
    </li>
  );
};

export default Item;
