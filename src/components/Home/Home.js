import React from "react";
import style from "./Home.module.css";
import Img from "../../assets/images/homepage.jpg";
import Button from "../UI/Button";
import Container from "react-bootstrap/Container";
import HotelsList from "../Hotels/HotelsList";

/* 30/08/2022 problem: only one link can be active */

function Home() {
  const showContent = (event) => {
    const target = event.currentTarget;
    target.classList.toggle(style.active);
  };

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
        <div className={style.categories_div}>
          <p
            // onClick={(event) => showContent("Hotels")}
            onClick={showContent}
            className={style.category_name}
          >
            Hotels
          </p>
          <p
            // onClick={(event) => showContent("B&B")}
            onClick={showContent}
            className={style.category_name}
          >
            B&B
          </p>
          <p
            // onClick={(event) => showContent("Guesthouse")}
            onClick={showContent}
            className={style.category_name}
          >
            Guesthouses
          </p>
        </div>
        <HotelsList />
      </Container>
    </>
  );
}

export default Home;
