import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function HotelItem({ id, title }) {
  return (
    <Link to={`detail/${id}`} key={id}>
      <h3>{title}</h3>
    </Link>
  );
}

HotelItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default HotelItem;
