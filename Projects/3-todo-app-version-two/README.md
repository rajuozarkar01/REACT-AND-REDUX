1. : App.jsx Sends Data
   App.jsx has an array todoItems.
   Passes it as a prop to TodoItems.
   **<TodoItems todoItems={todoItems}></TodoItems>**

2. : * **TodoItems.jsx** Receives and Maps the Data*
   *todoItems* is received as a prop.
   The .map() function iterates over each item in *todoItems*.
   For every item in the array, a new **TodoItem** component is created with:
   *todoName = item.name*
   *todoDate = item.dueDate*
   The key ensures each item has a unique identifier.
   **.map()** function generates:
   **<TodoItem key="3/9/2024Buy milk" todoDate="3/9/2024" todoName="Buy milk" />**
   **<TodoItem key="3/9/2024Go to College" todoDate="3/9/2024" todoName="Go to College" />**
   **<TodoItem key="3/9/2024Complete state Project" todoDate="3/9/2024" todoName="Complete state Project"/>**
   This means TodoItems returns a list of TodoItem components.

3. : TodoItem.jsx Renders Each Item
   TodoItem receives the props (todoName, todoDate).
   It displays them inside <div> elements.

   **Visualizing the Flow**

**App.jsx**
<TodoItems todoItems={todoItems} />

**TodoItems.jsx**
todoItems.map((item) => (
<TodoItem key={item.dueDate + item.name} todoDate={item.dueDate} todoName={item.name} />
))
Maps through todoItems and creates TodoItem components

**TodoItem.jsx**

<div className="col-6">{todoName}</div>
<div className="col-4">{todoDate}</div>

Renders the item on the UI ✅

Summary of Flow
App.jsx contains todoItems and passes them to TodoItems.
TodoItems maps through the array and creates multiple TodoItem components dynamically.
Each TodoItem receives todoName and todoDate as props and renders them in the UI.
This is how data flows from **App.jsx** → **TodoItems.jsx** → **TodoItem.jsx** to render each to-do item dynamically.
