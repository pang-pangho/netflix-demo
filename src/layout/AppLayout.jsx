import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NetflixLogo from "./netflixLogo.png";
const AppLayout = () => {
  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/app/movies?q=${keyword}`);
    setKeyword("");
  };

  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/app");
  };

  const goToMovies = () => {
    navigate("/app/movies");
  };
  return (
    <div>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#000" }} // 검은색 배경 설정
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              onClick={goToHome}
              src={NetflixLogo}
              width={100}
              height={70}
              alt=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={() => goToHome()}>Home</Nav.Link>
              <Nav.Link onClick={() => goToMovies()}>Movies</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                style={{
                  backgroundColor: "#343a40", // 배경색 검은색
                  color: "#ffffff", // 텍스트 색상 흰색
                }}
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
