import Header from "./components/Header";
import DisplayCounter from "./components/DisplayCounter";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "./components/Container";
import Controls from "./components/Controls";

function App() {
  return (
    <div className="col d-flex justify-content-center px-4 py-5 my-5 text-center">
      <Container>
        <Header />
        <div className="col-lg-6 mx-auto">
          <DisplayCounter />
          <Controls />
        </div>
      </Container>
    </div>
  );
}

export default App;
