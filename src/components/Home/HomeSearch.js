import style from "./HomeSearch.module.css";
import { useState } from "react";
import HotelSearch from "../Hotels/HotelSearch";
import Img from "../../assets/images/homepage.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

/**
 * Generates a search bar
 * @returns search bar and result list
 */

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
          {value && <HotelSearch input={value} />}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={style.search_icon}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeSearch;
