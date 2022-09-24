import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Layout/NavbarComponent";
import Content from "./components/Layout/Content";
import Footer from "./components/Layout/Footer";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import HotelDetail from "./components/Hotels/HotelDetail";
import Dashboard from "./components/dashBoard/Dashboard";
import EnquiryReceived from "./components/Enquiry/EnquiryReceived";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Content>
          <Router>
            <NavbarComponent />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/detail/:id" element={<HotelDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/received" element={<EnquiryReceived />} />
            </Routes>
          </Router>
        </Content>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
