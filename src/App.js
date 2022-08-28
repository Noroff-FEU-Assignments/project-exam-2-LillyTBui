import "./App.css";
import Content from "./components/Layout/Content";
import NavbarComponent from "./components/Layout/NavbarComponent";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <div className="App">
      <Content>
        <NavbarComponent />
      </Content>
      <Footer />
    </div>
  );
}

export default App;
