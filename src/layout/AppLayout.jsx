import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const goToMovies = () => {
    navigate("/movies");
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
              src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
              width={100}
              height={50}
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
