import { createStore } from "redux";

const INITIAL_VALUE = {
  counter: 5,
};
const counterReducer = (store = INITIAL_VALUE, action) => {
  console.log("Action received :", action); //debbugging

  if (action.type === "INCREMENT") {
    return { ...store, counter: store.counter + 1 };
  } else if (action.type === "DECREMENT") {
    return { ...store, counter: store.counter - 1 };
  }
  else if (action.type === "ADD") {
    return { ...store, counter: store.counter + Number(action.payload.num) };  //to convert string to number
  }
  else if (action.type === "SUBSTRACT") {
    return { ...store, counter: store.counter - Number(action.payload.num) };  //to convert string to number
  }

  return store;
};
const counterStore = createStore(counterReducer);

export default counterStore;
