import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants/api";
import PropTypes from "prop-types";
import HotelItem from "./HotelItem";
import ErrorMessage from "../UI/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";

const API = API_URL + "wp/v2/hotels?per_page=90";

/**
 * Returns a list of establishments
 * @param {string} category category to filter the hotels
 * @returns hotels matching the category
 */

function HotelsList({ category }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await axios.get(API);
          const filtered_data = response.data.filter(
            (hotel) => hotel.acf.type === category
          );
          setHotels(filtered_data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [category]
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
    <>
      {hotels.map((hotel) => {
        return <HotelItem key={hotel.id} hotel={hotel} />;
      })}
    </>
  );
}

HotelsList.propTypes = {
  category: PropTypes.string,
};

export default HotelsList;
