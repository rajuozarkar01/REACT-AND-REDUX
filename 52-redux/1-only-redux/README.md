You're seeing `{ counter: 2 }` because of how your reducer is updating the state. Let's break it down step by step:

---

### **Your Code Analysis**

```js
const INITIAL_VALUE = {
  counter: 0,
};

const reducer = (store = INITIAL_VALUE, action) => {
  return { counter: store.counter + 1 }; // Always increases counter by 1
};

const store = redux.createStore(reducer);

const subscriber = () => {
  const state = store.getState();
  console.log(state);
};

store.subscribe(subscriber);

store.dispatch({ type: "INCREMENT" });
```

---

### **Step-by-Step Execution**

1. **Initial State**

   ```js
   const INITIAL_VALUE = { counter: 0 };
   ```

   - Your Redux store starts with `counter: 0`.

2. **Reducer Function**

   ```js
   const reducer = (store = INITIAL_VALUE, action) => {
     return { counter: store.counter + 1 };
   };
   ```

   - No matter what action is dispatched, your reducer **always** returns `{ counter: store.counter + 1 }`.

3. **Creating the Redux Store**

   ```js
   const store = redux.createStore(reducer);
   ```

   - The store is created with the reducer function.

4. **Subscribing to Store Updates**

   ```js
   const subscriber = () => {
     const state = store.getState();
     console.log(state);
   };
   store.subscribe(subscriber);
   ```

   - Whenever the store updates, `subscriber()` logs the current state.

5. **Dispatching an Action**

   ```js
   store.dispatch({ type: "INCREMENT" });
   ```

   - This triggers the reducer:
     ```js
     return { counter: store.counter + 1 };
     ```
     - Since the initial value is `{ counter: 0 }`, it returns `{ counter: 1 }`.

6. **Redux Calls the Reducer Again (Initial Setup)**

   - Redux **automatically** calls the reducer **once** when the store is created to set the initial state.
   - Since your reducer **always increments counter**, the first automatic call sets:
     ```js
     {
       counter: 1;
     }
     ```

7. **Final State**
   - The initial call sets `{ counter: 1 }`.
   - The explicit `store.dispatch({ type: 'INCREMENT' })` increments again, making `{ counter: 2 }`.

---

### **Fixing the Code to Work Correctly**

If you want the counter to update **only when the correct action type is dispatched**, update your reducer like this:

```js
const reducer = (store = INITIAL_VALUE, action) => {
  if (action.type === "INCREMENT") {
    return { counter: store.counter + 1 };
  }
  return store; // Return the same state if action type is unknown
};
```

Now, the counter will only increment when the `'INCREMENT'` action is dispatched.

---

### **Final Thought**

Your output `{ counter: 2 }` happened because:

1. Redux **automatically** calls the reducer once when the store is created, incrementing `counter` to `1`.
2. Your explicit `dispatch({ type: 'INCREMENT' })` incremented it again, resulting in `2`.

If you only want `counter` to start at `0` and increment on dispatch, use the **fixed reducer**.

Let me know if you have any questions! 🚀
----------------------------------------------------------------------
version : II
----------------------------------------------------------------------

Let's break down your code step by step and analyze its behavior.

---

### **Code Explanation**
```js
const redux = require("redux");
```
- This imports the Redux library in a Node.js environment.


### **Initial State**
const INITIAL_VALUE = {
  counter: 0,
};
- This defines the initial state of the Redux store with `counter` set to `0`.

### **Reducer Function**
const reducer = (store = INITIAL_VALUE, action) => {
  let newStore = store;
  if (action.type === "INCREMENT") {
    newStore = { counter: store.counter + 1 };
  } else if (action.type === "DECREMENT") {
    newStore = { counter: store.counter + action.paylod.number };
  } else if (action.type === "ADDITION") {
    newStore = { counter: store.counter - 1 };
  }
  console.log("reducer called", action);
  return newStore;
};
#### **Understanding the Reducer:**
- The reducer takes the current `store` and an `action`.
- Depending on the `action.type`, it updates the state.
- It prints `"reducer called"` along with the action object whenever it is executed.
- Issues:
  1. **Incorrect Action Names**
     - `"ADDITION"` is actually decrementing `counter` (`counter - 1`), which is misleading.
  3. **Mutable State Issue**
     - `let newStore = store;` doesn't actually create a new object.
     - Redux **requires immutability**, so modifying `store` directly can lead to unexpected behavior.

#### **Fixed Reducer:**
```js
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
```

---

### **Creating the Store**
```js
const store = redux.createStore(reducer);
```
- This initializes the Redux store with the `reducer` function.

---

### **Subscribing to Store Changes**
```js
const subscriber = () => {
  const state = store.getState();
  console.log(state);
};
store.subscribe(subscriber);
```
- The `subscriber` function logs the state every time the store updates.
- `store.subscribe(subscriber)` makes sure the `subscriber` function runs after every state change.

---

### **Dispatching Actions**
```js
store.dispatch({ type: "INCREMENT" }); 
store.dispatch({ type: "DECREMENT" }); 
store.dispatch({ type: "INCREMENT" }); 
store.dispatch({ type: "ADDITION", payload: { number: 7 } });
store.dispatch({ type: "DECREMENT" }); 
```
#### **Step-by-Step Execution:**
1. **Initial State: `{ counter: 0 }`**
2. **First Dispatch: `INCREMENT`**
   - `counter = 0 + 1`
   - Output: `{ counter: 1 }`
3. **Second Dispatch: `DECREMENT`**
   - `store.counter + action.paylod.number` → **Typo!**
   - This will likely **cause an error** or not work as expected.
4. **Third Dispatch: `INCREMENT`**
   - If the error didn't break execution, `counter = 1 + 1`
   - Output: `{ counter: 2 }`
5. **Fourth Dispatch: `ADDITION`**  
   - `counter = 2 - 1`
   - Output: `{ counter: 1 }`
6. **Fifth Dispatch: `DECREMENT`**
   - If fixed, it would subtract `payload.number` from `counter`.

---

### **Final Fixes and Expected Output**
#### **Corrected Dispatch Calls**
```js
store.dispatch({ type: "INCREMENT" }); // counter = 1
store.dispatch({ type: "DECREMENT", payload: { number: 2 } }); // counter = -1
store.dispatch({ type: "INCREMENT" }); // counter = 0
store.dispatch({ type: "ADDITION" }); // counter = -1
store.dispatch({ type: "DECREMENT", payload: { number: 3 } }); // counter = -4
```

#### **Expected Output**
```bash
reducer called { type: 'INCREMENT' }
{ counter: 1 }
reducer called { type: 'DECREMENT', payload: { number: 2 } }
{ counter: -1 }
reducer called { type: 'INCREMENT' }
{ counter: 0 }
reducer called { type: 'ADDITION' }
{ counter: -1 }
reducer called { type: 'DECREMENT', payload: { number: 3 } }
{ counter: -4 }
```

---

### **Summary of Fixes**
✅ **Fix the typo**: Change `paylod` to `payload` in the reducer.  
✅ **Ensure immutability**: Always return a new object instead of mutating `store`.  
✅ **Fix the misleading `"ADDITION"` action**: It should be named `"SUBTRACT"` or `"DECREMENT_ONE"`.  
✅ **Pass payload properly**: The `"DECREMENT"` action requires a `payload`.  

