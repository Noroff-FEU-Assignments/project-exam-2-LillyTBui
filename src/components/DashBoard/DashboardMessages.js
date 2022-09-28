import style from "./DashboardMessages.module.css";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants/api";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import ErrorMessage from "../UI/ErrorMessage";
import DashbordMessage from "./DashbordMessage";
import Select from "react-select";
import sortBy from "lodash/sortBy";
import { options } from "../../constants/dashboardOptions";

const url = API_URL + `wp/v2/messages`;

/**
 * Generates a list of contact messages
 * Retrieves all messages from API
 * @returns a list of messages from customers
 */

function DashboardMessages() {
  const [messages, setMessages] = useState([]);
  const [select, setSelect] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          let data;
          if (select === "newest") {
            data = sortBy(response.data, ["date"]);
            data.reverse();
          } else if (select === "oldest") {
            data = sortBy(response.data, ["date"]);
          }
          setMessages(data);
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
        <h3>Messages</h3>
        <Select
          options={options}
          onChange={handleChange}
          defaultValue={options[0]}
          className={style.filter}
        />
      </div>
      <div className={style.table_div}>
        <h5 className={style.table_heading}>Date</h5>
      </div>
      {messages.length === 0 && <p>No messages yet</p>}
      <Accordion>
        {messages.map((message) => {
          return <DashbordMessage key={message.id} message={message} />;
        })}
      </Accordion>
    </div>
  );
}

export default DashboardMessages;
