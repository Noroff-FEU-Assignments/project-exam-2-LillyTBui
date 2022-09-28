import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants/api";
import sortBy from "lodash/sortBy";
import { options } from "../../constants/accommodationsOptions";
import ErrorMessage from "../UI/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import AccommodationItem from "./AccommodationItem";
import Select from "react-select";
import style from "./Accommodation.module.css";

const API = API_URL + "wp/v2/hotels?per_page=90";

/**
 * Generates accommodation page
 * @returns list of all accommodations
 */

function Accommodation() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [select, setSelect] = useState(null);
  const [value, setValue] = useState("");

  const handleChange = (select) => {
    if (select !== null) {
      setSelect(select.value);
    } else {
      setSelect(null);
    }
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await axios.get(API);
          let filtered_data;
          if (select === null) {
            filtered_data = response.data;
          } else if (select === "recommended") {
            filtered_data = response.data;
          } else if (select === "ascending") {
            filtered_data = sortBy(response.data, ["acf.price"]);
          } else if (select === "descending") {
            filtered_data = sortBy(response.data, ["acf.price"]);
            filtered_data.reverse();
          } else if (select === "distance") {
            filtered_data = sortBy(response.data, ["acf.km"]);
          } else if (select === "ratingDescending") {
            filtered_data = sortBy(response.data, ["acf.rating"]);
            filtered_data.reverse();
          } else if (select === "ratingAscending") {
            filtered_data = sortBy(response.data, ["acf.rating"]);
          }
          if (value.length !== 0) {
            filtered_data = filtered_data.filter((hotel) => {
              return hotel.title.rendered
                .toLowerCase()
                .startsWith(value.toLowerCase());
            });
          }
          setHotels(filtered_data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [select, value]
  );

  if (loading) {
    return (
      <div className="spinner_div">
        <Spinner animation="border" role="status" className="spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage>An error occurred: {error}</ErrorMessage>;
  }

  return (
    <Container>
      <div>
        <div className={style.sort_by}>
          <p>Sort by</p>
          <Select
            options={options}
            isClearable={true}
            className={style.sort_by_select}
            onChange={handleChange}
          />
        </div>
        <div className={style.accommodation_list_div}>
          <div>
            <p>Hotel Search</p>
            <input
              id="search"
              type="text"
              className={style.search}
              placeholder="Search"
              onChange={onChange}
              value={value}
            />
          </div>
          <div className={style.accommodation_list}>
            {hotels.length === 0 && <p>No hotels found</p>}
            {hotels.map((hotel) => {
              return <AccommodationItem key={hotel.id} hotel={hotel} />;
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Accommodation;
