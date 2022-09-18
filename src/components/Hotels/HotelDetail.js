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
import ModalContext from "../../Context/Modal-context";
import Modal from "../Modal/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import style from "./HotelDetail.module.css";

/**
 * Generates a hotel detail page
 * @returns details about a specific hotel and enquiry form
 */

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

  const URL = API_URL + `wp/v2/hotels/${id}`;

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await axios.get(URL);
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

  //get each facility from string
  const facilities_split = hotel.acf.facilities.trim().split(",");
  const facilities = facilities_split.filter((facility) => {
    return facility.length !== 0;
  });

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
          <h1>{hotel.title.rendered}</h1>
          <FontAwesomeIcon icon={faStar} className={style.star_icon} />
          <p>{hotel.acf.rating}</p>
        </div>
        <h2 className={style.address}>{hotel.acf.address}</h2>
        <div className={style.img_container}>
          <img
            src={hotel.acf.image_url}
            alt={hotel.title.rendered}
            className={style.img}
          />
        </div>
        <div className={style.content_div}>
          <div className={style.tab_container}>
            <Tabs defaultActiveKey="about" id="tab" className={style.tab_ul}>
              <Tab eventKey="about" title="About">
                <div className={style.tab_content}>
                  <h3 className={style.tab_content_header}>About</h3>
                  <p>{hotel.acf.description}</p>
                </div>
              </Tab>
              <Tab eventKey="location" title="Location">
                <div className={style.tab_content}>
                  <h3 className={style.tab_content_header}>Location</h3>
                  <p className={style.tab_address}>
                    <span>Address:</span> {hotel.acf.address}
                  </p>
                  <p>{hotel.acf.address_description}</p>
                </div>
              </Tab>
              <Tab eventKey="facilities" title="Facilities">
                <div className={style.tab_content}>
                  <h3 className={style.tab_content_header}>Facilities</h3>
                  <ul>
                    {facilities.map((facility) => {
                      return <li key={facility}>{facility}</li>;
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
        <Modal price={hotel.acf.price} />
      </Container>
    </ModalContext.Provider>
  );
}

export default HotelDetail;
