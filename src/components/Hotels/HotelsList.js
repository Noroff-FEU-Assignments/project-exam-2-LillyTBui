import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants/api";
import HotelItem from "./HotelItem";
import ErrorMessage from "../UI/ErrorMessage";
import Spinner from "react-bootstrap/Spinner";

const API = API_URL + "wc/store/products/";

function HotelsList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(API);
        console.log(response.data);
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

  return (
    <div>
      {hotels.map((hotel) => {
        const { id, name } = hotel;
        return <HotelItem key={id} id={id} title={name} />;
      })}
    </div>
  );
}

export default HotelsList;
