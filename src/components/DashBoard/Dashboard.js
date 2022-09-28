import React from "react";
import DashboardMessages from "./DashboardMessages";
import DashboardEnquiries from "./DashboardEnquiries";
import DashboardEstablishment from "./DashboardEstablishment";
import Container from "react-bootstrap/Container";
import style from "./Dashboard.module.css";

/**
 * Generates the dashboard page
 * @returns contact messages, enquiries and create an establishment form
 */

function Dashboard({ user }) {
  //Show today's date
  const date = new Date();
  let day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return (
    <div className={style.dashboard}>
      <Container>
        <p className={style.date}>
          {day}.{month}, {year}
        </p>
        <h1>Welcome back, {user}!</h1>
        <DashboardMessages />
        <DashboardEnquiries />
      </Container>
      <DashboardEstablishment />
    </div>
  );
}

export default Dashboard;
