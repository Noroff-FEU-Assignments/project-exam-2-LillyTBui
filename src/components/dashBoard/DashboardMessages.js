import style from "./DashboardMessages.module.css";
import { useState, useEffect } from "react";
import { API_URL } from "../../constants/api";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import ErrorMessage from "../UI/ErrorMessage";
import DashbordMessage from "./DashbordMessage";

const url = API_URL + `wp/v2/messages`;

/**
 * Generates a list of contact messages
 * Retrieves all messages from API
 * @returns a list of messages from customers
 */

function DashboardMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setMessages(response.data);
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
    <div className={style.dashboardMessages_div}>
      <h3>Messages</h3>
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
