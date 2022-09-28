import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/api";
import PropTypes from "prop-types";
import ErrorMessage from "../UI/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";
import style from "./HotelSearch.module.css";

const API = API_URL + "wp/v2/hotels?per_page=90";

/**
 * Search for the hotels
 * @param {string}  input search input from user
 * @returns hotels matching the search input
 */

function HotelSearch({ input }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(API);
        setHotels(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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

  const filtered_data = hotels.filter((hotel) => {
    return hotel.title.rendered.toLowerCase().startsWith(input.toLowerCase());
  });

  return (
    <div className={style.result_div}>
      <ul className={style.result_ul}>
        {filtered_data.length === 0 && (
          <p className={style.no_result}>No results matching '{input}'</p>
        )}
        {filtered_data.length !== 0 &&
          filtered_data.map((hotel) => {
            return (
              <Link to={`detail/${hotel.id}`} key={hotel.id}>
                <li key={hotel.id}>
                  <div className={style.hotel_div}>
                    <p>{hotel.title.rendered}</p>
                    <img
                      src={hotel.acf.image_url}
                      alt={hotel.title.rendered}
                      className={style.hotel_img}
                    />
                  </div>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}

HotelSearch.propTypes = {
  input: PropTypes.string,
};

export default HotelSearch;
