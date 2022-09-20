import React from "react";
import DashboardMessages from "./DashboardMessages";
import DashboardEnquiries from "./DashboardEnquiries";
import DashboardEstablishment from "./DashboardEstablishment";
import Container from "react-bootstrap/Container";
import style from "./Dashboard.module.css";

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
