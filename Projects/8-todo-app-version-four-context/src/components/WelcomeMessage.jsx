import styles from "./WelcomeMessage.module.css";
const WelcomeMessage = ({todoItems}) => {
  return !todoItems &&<p className={styles.welcome}>Enjoy Your Day !</p>;
};
export default WelcomeMessage;

//how to add style(styles.welcome) :: time stame = 7:5hrs
