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

function Dashboard() {
  return (
    <div className={style.dashboard}>
      <Container>
        <DashboardMessages />
        <DashboardEnquiries />
      </Container>
      <DashboardEstablishment />
    </div>
  );
}

export default Dashboard;
