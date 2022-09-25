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
  return (
    <div className={style.dashboard}>
      <Container>
        <h1 className={style.welcome}>Welcome back, {user}!</h1>
        <DashboardMessages />
        <DashboardEnquiries />
      </Container>
      <DashboardEstablishment />
    </div>
  );
}

export default Dashboard;
