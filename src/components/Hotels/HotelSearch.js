import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/api";
import ErrorMessage from "../UI/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";
import style from "./HotelSearch.module.css";

const API =
  API_URL +
  `wc/v3/products?consumer_key=${process.env.REACT_APP_WC_CONSUMER_KEY}&consumer_secret=${process.env.REACT_APP_WC_CONSUMER_SECRET}&per_page=90`;

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
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <ErrorMessage>An error occurred: {error}</ErrorMessage>;
  }

  const filtered_data = hotels.filter((hotel) => {
    return hotel.name.toLowerCase().startsWith(input.toLowerCase());
  });

  return (
    <div className={style.result_div}>
      <ul className={style.result_ul}>
        {filtered_data.length === 0 && <em>No results found</em>}
        {filtered_data.length !== 0 &&
          filtered_data.map((hotel) => {
            return (
              <Link to={`detail/${hotel.id}`} key={hotel.id}>
                <li key={hotel.id}>{hotel.name}</li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}

export default HotelSearch;
