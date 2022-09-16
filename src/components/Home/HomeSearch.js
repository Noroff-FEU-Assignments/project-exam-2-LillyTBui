import style from "./HomeSearch.module.css";
import { useState } from "react";
import HotelSearch from "../Hotels/HotelSearch";
import Img from "../../assets/images/homepage.jpg";

function HomeSearch() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={style.hero_div}>
      <img src={Img} alt="panorama view over Bergen from Ulrikken" />
      <div className={style.search_div}>
        <h1 className={style.search_title}>Find your next stay</h1>
        <div className={style.search_inner}>
          <input
            id="search"
            type="text"
            className={style.search}
            placeholder="Search"
            onChange={onChange}
            value={value}
          />
        </div>
        {value ? <HotelSearch input={value} /> : <p></p>}
      </div>
    </div>
  );
}

export default HomeSearch;
