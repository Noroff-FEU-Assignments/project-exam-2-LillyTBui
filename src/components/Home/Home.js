import style from "./Home.module.css";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HotelsList from "../Hotels/HotelsList";
import HomeSearch from "./HomeSearch";

function Home() {
  return (
    <>
      <HomeSearch />
      <Container>
        <Tabs
          defaultActiveKey="hotels"
          id="home-tab"
          className={style.category_tab}
        >
          <Tab eventKey="hotels" title="Hotels" className={style.category_item}>
            <div className={style.hotel_list_container}>
              <HotelsList category="Hotel" />
            </div>
          </Tab>
          <Tab eventKey="Bed & Breakfast" title="Bed & Breakfast">
            <div className={style.hotel_list_container}>
              <HotelsList category="Bed and breakfast" />
            </div>
          </Tab>
          <Tab eventKey="guesthouses" title="Guesthouses">
            <div className={style.hotel_list_container}>
              <HotelsList category="Guesthouse" />
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default Home;
