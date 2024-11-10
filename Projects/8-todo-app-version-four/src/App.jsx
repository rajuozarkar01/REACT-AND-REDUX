import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import "bootstrap/dist/css/bootstrap.min.css";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import TodoItemsContextProvider from "./components/store/todo-items-store";

function App() {
  return (
    <TodoItemsContextProvider>
      <div className="app-main">
        <AppName />
        <AddTodo />
        <WelcomeMessage></WelcomeMessage>
        <TodoItems></TodoItems>
      </div>
    </TodoItemsContextProvider>
  );
}
export default App;

//In This version  all the component get their value's from Context.provider, we use it as store
