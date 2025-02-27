import { useRef, useEffect } from "react";
import "./App.css";
import Signup from "./component/Signup";
import Contact from "./component/Contact";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const itemRef = useRef(null); // Create a reference

  useEffect(() => {
    if (itemRef.current) {
      console.log("ItemRef is attached:", itemRef.current);
      itemRef.current.style.backgroundColor = "lightblue"; // Example usage
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <nav>
          <Link to="/">Home</Link> | <Link to="/signup">Signup</Link>
        </nav>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Contact />} />

          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
