import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/api";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ErrorMessage from "../UI/ErrorMessage";
import RemoveTags from "../UI/RemoveTags";
import ModalContext from "../../Context/Modal-context";
import Modal from "../Modal/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import style from "./HotelDetail.module.css";

function HotelDetail() {
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const value = useMemo(() => ({ show, setShow }), [show]);

  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  const { id } = useParams();

  if (!id || id === "undefined") {
    navigate("/");
  }

  const URL =
    API_URL +
    `wc/v3/products/${id}?consumer_key=${process.env.REACT_APP_WC_CONSUMER_KEY}&consumer_secret=${process.env.REACT_APP_WC_CONSUMER_SECRET}`;

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await axios.get(URL);
          console.log(response.data);
          setHotel(response.data);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [URL]
  );

  if (loading) {
    return (
      <Spinner animation="border" role="status" className="spinner">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <ModalContext.Provider value={value}>
      <Container>
        <Link to="/">
          <p className={style.breadcrumb}>
            {" "}
            <FontAwesomeIcon icon={faAngleLeft} className={style.icon} />
            See all properties
          </p>
        </Link>
        <div className={style.title_container}>
          <h1>{hotel.name}</h1>
          <FontAwesomeIcon icon={faStar} className={style.star_icon} />
          <p>{hotel.attributes[2].options[0]}</p>
        </div>
        <h2 className={style.address}>{hotel.attributes[0].options[0]}</h2>
        <div className={style.img_container}>
          <img
            src={hotel.images[0].src}
            alt={hotel.images[0].alt}
            className={style.img}
          />
        </div>
        <div className={style.content_div}>
          <div className={style.tab_container}>
            <Tabs defaultActiveKey="about" id="tab" className={style.tab_ul}>
              <Tab eventKey="about" title="About">
                <div className={style.tab_content}>
                  <h3 className={style.tab_content_header}>About</h3>
                  <p>
                    <RemoveTags>{hotel.description}</RemoveTags>
                  </p>
                </div>
              </Tab>
              <Tab eventKey="location" title="Location">
                <div className={style.tab_content}>
                  <h3 className={style.tab_content_header}>Location</h3>
                  <p className={style.tab_address}>
                    <span>Address:</span> {hotel.attributes[0].options[0]}
                  </p>
                  <p>
                    <RemoveTags>{hotel.attributes[3].options[0]}</RemoveTags>
                  </p>
                </div>
              </Tab>
              <Tab eventKey="facilities" title="Facilities">
                <div className={style.tab_content}>
                  <h3 className={style.tab_content_header}>Facilities</h3>
                  <ul>
                    {hotel.tags.map((tag) => {
                      return <li key={tag.id}>{tag.name}</li>;
                    })}
                  </ul>
                </div>
              </Tab>
            </Tabs>
          </div>
          <button className={style.reserve_btn} onClick={handleShow}>
            Reserve
          </button>
        </div>
        <Modal price={hotel.price} />
      </Container>
    </ModalContext.Provider>
  );
}

export default HotelDetail;
