import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants/api";
import HotelItem from "./HotelItem";
import ErrorMessage from "../UI/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";

const API = API_URL + "wp/v2/hotels";
// const API =
//   API_URL +
//   `wc/v3/products?consumer_key=${process.env.REACT_APP_WC_CONSUMER_KEY}&consumer_secret=${process.env.REACT_APP_WC_CONSUMER_SECRET}&per_page=90`;

function HotelsList({ category }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
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

  return (
    <>
      {hotels.map((hotel) => {
        return <HotelItem key={hotel.id} hotel={hotel} />;
      })}
    </>
  );
}

export default HotelsList;
