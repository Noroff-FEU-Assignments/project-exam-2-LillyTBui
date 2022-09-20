import { useState, useEffect } from "react";
import { API_URL } from "../../constants/api";
import axios from "axios";
import style from "./DashboardEnquiries.module.css";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import ErrorMessage from "../UI/ErrorMessage";
import DashboardEnquiry from "./DashboardEnquiry";

const url = API_URL + `wp/v2/enquiries`;

/**
 * Generates a list of enquiries
 * @returns list of enquiries if there are any
 */

function DashboardEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setEnquiries(response.data);
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
    <div className={style.dashboardEnquiries_div}>
      <h3>Enquiries</h3>
      <div className={style.table_div}>
        <h5 className={style.table_heading}>Hotel</h5>
      </div>
      {enquiries.length === 0 && <p>No enquiries yet</p>}
      <Accordion>
        {enquiries.map((enquiry) => {
          return <DashboardEnquiry key={enquiry.id} enquiry={enquiry} />;
        })}
      </Accordion>
    </div>
  );
}

export default DashboardEnquiries;
