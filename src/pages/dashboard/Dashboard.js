import { Grow } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Grow in>
          <Container className="container">
            <h1>Welcome to Dashboard!!</h1>
          </Container>
        </Grow>
      </Container>
    </>
  );
};

export default Dashboard;
