import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import style from "./HotelItem.module.css";

import Card from "react-bootstrap/Card";

function HotelItem({ hotel }) {
  console.log(hotel);
  return (
    <Link to={`detail/${hotel.id}`} key={hotel.id}>
      <Card className={style.card}>
        <Card.Img
          variant="top"
          src={hotel.acf.image_url}
          alt={hotel.title.rendered}
          className={style.img}
        />
        <Card.Body className={style.card_body}>
          <div>
            <Card.Title className={style.title_container}>
              <h3 className={style.title}>{hotel.title.rendered}</h3>
              <FontAwesomeIcon icon={faStar} className={style.star_icon} />
              <p>{hotel.acf.rating}</p>
            </Card.Title>
            <Card.Text>{hotel.acf.km}km away from city center</Card.Text>
          </div>
          <Card.Text>{hotel.acf.price} NOK per night</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

HotelItem.propTypes = {
  hotel: PropTypes.object.isRequired,
};

export default HotelItem;
