import React from "react";
import style from "./Home.module.css";
import Img from "../../assets/images/homepage.jpg";
import Button from "../UI/Button";
import Container from "react-bootstrap/Container";

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
      <Container></Container>
    </>
  );
}

export default Home;
