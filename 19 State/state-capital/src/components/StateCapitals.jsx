import StateCapital from "./StateCapital";
import styles from "./StateCapitals.module.css";

const StateCapitals = ({ stateCapitals }) => {
  return (
    <div className={styles.stateContainer}>
      {stateCapitals.map((item) => (
        <StateCapital
          key={item.state + item.capital}
          stateName={item.state}
          stateCapital={item.capital}
        ></StateCapital>
      ))}
    </div>
  );
};

export default StateCapitals;
