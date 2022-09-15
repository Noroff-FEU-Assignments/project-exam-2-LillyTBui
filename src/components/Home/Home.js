import React from "react";
import style from "./Home.module.css";
import Img from "../../assets/images/homepage.jpg";
import Button from "../UI/Button";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HotelsList from "../Hotels/HotelsList";

function Home() {
  return (
    <>
      <div className={style.hero_div}>
        <img src={Img} alt="panorama view over Bergen from Ulrikken" />
        <div className={style.search_div}>
          <h1 className={style.search_title}>Find your next stay</h1>
          <div className={style.search_box}>
            <input
              type="text"
              className={style.search}
              placeholder="Hotel name..."
            />
            <Button>Search</Button>
          </div>
        </div>
      </div>
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
