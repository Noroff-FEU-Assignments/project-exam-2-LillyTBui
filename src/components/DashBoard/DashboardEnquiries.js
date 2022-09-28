import { useState, useEffect } from "react";
import { API_URL } from "../../constants/api";
import axios from "axios";
import style from "./DashboardMessages.module.css";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import ErrorMessage from "../UI/ErrorMessage";
import DashboardEnquiry from "./DashboardEnquiry";
import Select from "react-select";
import sortBy from "lodash/sortBy";
import { options } from "../../constants/dashboardOptions";

const url = API_URL + `wp/v2/enquiries`;

/**
 * Generates a list of enquiries
 * @returns list of enquiries if there are any
 */

function DashboardEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [select, setSelect] = useState("newest");

  const handleChange = (select) => {
    if (select !== null) {
      setSelect(select.value);
    } else {
      setSelect("newest");
    }
  };

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await axios.get(url);
          let enquiries;
          if (select === "newest") {
            enquiries = sortBy(response.data, ["date"]);
            enquiries.reverse();
          } else if (select === "oldest") {
            enquiries = sortBy(response.data, ["date"]);
          }
          setEnquiries(enquiries);
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [select]
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
    <div className={style.dashboard_div}>
      <div className={style.header}>
        <h3>Enquiries</h3>
        <Select
          options={options}
          onChange={handleChange}
          defaultValue={options[0]}
          className={style.filter}
        />
      </div>

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
