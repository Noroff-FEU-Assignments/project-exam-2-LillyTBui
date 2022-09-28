import useLocalStorage from "./hooks/useLocalStorage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import NavbarComponent from "./components/Layout/NavbarComponent";
import Content from "./components/Layout/Content";
import Footer from "./components/Layout/Footer";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import HotelDetail from "./components/Hotels/HotelDetail";
import Dashboard from "./components/DashBoard/Dashboard";
import EnquiryReceived from "./components/Enquiry/EnquiryReceived";
import Accommodation from "./components/Accommodation/Accommodation";
import messageToken from "./constants/messageToken";

messageToken();
function App() {
  const [user, setUser] = useLocalStorage("user", null);

  return (
    <div className="App">
      <AuthProvider>
        <Content>
          <Router>
            <NavbarComponent />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/accommodations" element={<Accommodation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/detail/:id" element={<HotelDetail />} />
              <Route
                path="accommodations/detail/:id"
                element={<HotelDetail />}
              />
              <Route path="/dashboard" element={<Dashboard user={user} />} />
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
