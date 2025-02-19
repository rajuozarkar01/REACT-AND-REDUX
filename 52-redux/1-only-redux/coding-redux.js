// YT: 15: 22: 00
const redux = require("redux"); 
// imports the Redux library in a Node.js environment.


const INITIAL_VALUE = {
  counter: 0,
};
// initial state of the Redux store with counter set to 0.

const reducer = (store = INITIAL_VALUE, action) => {
  if (action.type === "INCREMENT") {
    return { counter: store.counter + 1 };
  } else if (action.type === "DECREMENT") {
    return { counter: store.counter - action.payload.number };
  } else if (action.type === "ADDITION") {
    return { counter: store.counter - 1 }; // This name should probably be "SUBTRACT"
  }
  console.log("reducer called", action);
  return store;
};

const store = redux.createStore(reducer); 



const subscriber = () => {
  const state = store.getState();
  console.log(state);
};
store.subscribe(subscriber);


store.dispatch({ type: "INCREMENT" }); // counter = 1
store.dispatch({ type: "DECREMENT", payload: { number: 2 } }); // counter = -1
store.dispatch({ type: "INCREMENT" }); // counter = 0
store.dispatch({ type: "ADDITION" }); // counter = -1
store.dispatch({ type: "DECREMENT", payload: { number: 3 } }); // counter = -4

