import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from "./components/Layout/Content";
import Footer from "./components/Layout/Footer";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import NavbarComponent from "./components/Layout/NavbarComponent";

function App() {
  return (
    <div className="App">
      <Content>
        <Router>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </Content>
      <Footer />
    </div>
  );
}

export default App;
