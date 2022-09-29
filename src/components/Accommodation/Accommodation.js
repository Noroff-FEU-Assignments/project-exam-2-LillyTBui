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
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

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
  const [categories, setCategories] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [toggleIconCategories, setToggleIconCategories] = useState(faAngleDown);
  const [toggleIconFacilities, setToggleIconFacilities] = useState(faAngleDown);
  const [results, setResults] = useState();

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      if (eventKey === "0") {
        if (toggleIconCategories === faAngleDown) {
          setToggleIconCategories(faAngleUp);
        } else {
          setToggleIconCategories(faAngleDown);
        }
      } else if (eventKey === "1") {
        if (toggleIconFacilities === faAngleDown) {
          setToggleIconFacilities(faAngleUp);
        } else {
          setToggleIconFacilities(faAngleDown);
        }
      }
    });

    return (
      <button
        type="button"
        className={style.categories_title}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

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

  const showFilter = () => {
    const filterDiv = document.querySelector("#filter_div");
    filterDiv.classList.toggle("show_filter");
  };

  //Toggle chosen values in categories
  const handleCategories = (event) => {
    let category_exists = false;
    if (categories.length === 0) {
      if (event.target.checked) {
        setCategories([event.target.id]);
      }
    } else {
      let categories_array = categories;
      let copy_array = categories_array.map((category) => category);
      if (event.target.checked) {
        for (let i = 0; i < copy_array.length; i++) {
          if (copy_array[i] === event.target.id) {
            category_exists = true;
          }
        }
        if (category_exists === false) {
          setCategories([...copy_array, event.target.id]);
        }
      } else {
        let array = copy_array.filter(
          (category) => category !== event.target.id
        );
        setCategories([...array]);
      }
    }
  };

  //Toggle chosen values in facilities
  const handleFacilities = (event) => {
    let facility_exists = false;
    if (facilities.length === 0) {
      if (event.target.checked) {
        setFacilities([event.target.id]);
      }
    } else {
      let facilities_array = facilities;
      let copy_array = facilities_array.map((facility) => facility);
      if (event.target.checked) {
        for (let i = 0; i < copy_array.length; i++) {
          if (copy_array[i] === event.target.id) {
            facility_exists = true;
          }
        }
        if (facility_exists === false) {
          setFacilities([...copy_array, event.target.id]);
        }
      } else {
        let array = copy_array.filter(
          (facility) => facility !== event.target.id
        );
        setFacilities([...array]);
      }
    }
  };

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await axios.get(API);
          let filtered_data;
          //filter by sort
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
          //filter by search value
          if (value.length !== 0) {
            filtered_data = filtered_data.filter((hotel) => {
              return hotel.title.rendered
                .toLowerCase()
                .startsWith(value.toLowerCase());
            });
          }
          //filter by categories
          function containsCategories(hotel, categories) {
            for (let i = 0; i < categories.length; i++) {
              if (hotel.acf.type === categories[i]) {
                return hotel;
              }
            }
          }
          if (categories.length !== 0) {
            filtered_data = filtered_data.filter((hotel) => {
              return containsCategories(hotel, categories);
            });
          }
          //filter by facilities
          function containsFacilities(hotel, facilities) {
            let hasFacilities = true;
            for (let i = 0; i < facilities.length; i++) {
              if (hotel.acf.facilities.includes(facilities[i]) === false) {
                hasFacilities = false;
              }
            }
            if (hasFacilities) {
              return hotel;
            }
          }
          if (facilities.length !== 0) {
            filtered_data = filtered_data.filter((hotel) => {
              return containsFacilities(hotel, facilities);
            });
          }
          setHotels(filtered_data);
          setResults(filtered_data.length);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [select, value, categories, facilities, results]
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
      <div className={style.accommodation_container}>
        <div className={style.header}>
          {results === 1 && <p>{results} accommodation</p>}
          {results !== 1 && <p>{results} accommodations</p>}
          <div className={style.sort_by}>
            <p>Sort by</p>
            <Select
              options={options}
              isClearable={true}
              className={style.sort_by_select}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={style.filter_mobile}>
          {results === 1 && <p>{results} accommodation</p>}
          {results !== 1 && <p>{results} accommodations</p>}
          <FontAwesomeIcon icon={faFilter} onClick={showFilter} />
        </div>
        <div className={style.accommodation_filter_div} id="filter_div">
          <div>
            <p className={style.search_title}>Hotel Search</p>
            <input
              id="search"
              type="text"
              className={style.search}
              placeholder="Search"
              onChange={onChange}
              value={value}
            />
          </div>
          <Accordion
            defaultActiveKey="0"
            className={`${style.categories_div} ${style.categories}`}
          >
            <Card className={style.categories_card}>
              <Card.Header className={style.categories_title_div}>
                <CustomToggle eventKey="0">
                  <p className={style.categories_title}>Categories</p>
                  <FontAwesomeIcon icon={toggleIconCategories} />
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className={style.categories_card_body}>
                  <ul className={style.categories_ul}>
                    <li>
                      <input
                        type="checkbox"
                        id="Hotel"
                        onChange={handleCategories}
                      />
                      <label htmlFor="Hotel">Hotels</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="Bed and breakfast"
                        onChange={handleCategories}
                      />
                      <label htmlFor="Bed and breakfast">Bed & Breakfast</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="Guesthouse"
                        onChange={handleCategories}
                      />
                      <label htmlFor="Guesthouse">Guesthouse</label>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion
            defaultActiveKey="1"
            className={`${style.categories_div} ${style.categories_facilities}`}
          >
            <Card className={style.categories_card}>
              <Card.Header className={style.categories_title_div}>
                <CustomToggle eventKey="1">
                  <p className={style.categories_title}>Facilities</p>
                  <FontAwesomeIcon icon={toggleIconFacilities} />
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body className={style.categories_card_body}>
                  <ul className={style.categories_ul}>
                    <li>
                      <input
                        type="checkbox"
                        id="Air condition"
                        onChange={handleFacilities}
                      />
                      <label htmlFor="Air condition">Air condition</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="Breakfast"
                        onChange={handleFacilities}
                      />
                      <label htmlFor="Breakfast">Breakfast</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="No smoking"
                        onChange={handleFacilities}
                      />
                      <label htmlFor="No smoking">No smoking</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="Parking"
                        onChange={handleFacilities}
                      />
                      <label htmlFor="Parking">Parking</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="Pets allowed"
                        onChange={handleFacilities}
                      />
                      <label htmlFor="Pets allowed">Pets allowed</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="Restaurant"
                        onChange={handleFacilities}
                      />
                      <label htmlFor="Restaurant">Restaurant</label>
                    </li>
                    <li>
                      <input
                        type="checkbox"
                        id="Wi-fi"
                        onChange={handleFacilities}
                      />
                      <label htmlFor="Wi-fi">Wi-fi</label>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className={style.accommodation_list_div}>
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
