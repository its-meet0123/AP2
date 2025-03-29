import React from "react";

//import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "react-bootstrap/Navbar";
//import InputGroup from "react-bootstrap/InputGroup";
//import Form from "react-bootstrap/Form";

export default function NavBar({ query, setQuery }) {
  return (
    <>
      <Navbar
        className=" p-3 bg-primary justify-content-between"
        data-bs-theme="dark"
      >
        <Navbar.Brand href="#home">🍿 PoPcRoN</Navbar.Brand>
        <input
          placeholder="Search....."
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>Wacthing X movies.</span>
      </Navbar>
    </>
  );
}
