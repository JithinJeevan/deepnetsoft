/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [loginValues, setloginValues] = useState([]);

  const navigate = useNavigate();

  // Manage Field Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:6233/api/login", formValues)
      .then((response) => {
        setloginValues(response.data);
        console.log("data", response.data);

        let accessToken = response.data.accessToken;

        Cookies.set("access", accessToken);

        console.log(Cookies.get("access"));
      });

    setFormValues({ username: "", password: "" });
  };



  useEffect(()=>{
    redirecting();

},[loginValues])


  function redirecting() {
    //    console.log(formValues.username);
    //    console.log(username);
    // console.log("full", loginValues.id);
    if (loginValues.username === "admin" && loginValues.password === "123456") {
      navigate(`/dashboard`, { replace: true });
      console.log("Admin Login");
      
    }
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Product App</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>

      <Card
        className="w-50 ms-5 mt-5 bg-transparent"
        style={{ left: "22%", top: "10vh" }}
      >
        <Form className="w-100 ms-1 my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mx-5" controlId="formBasicEmail">
            <h3 className="text-primary">Login</h3>
          </Form.Group>
          <Form.Group className="mb-3 mx-5" controlId="formBasicEmail">
            <Form.Label className="text-white">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 mx-5" controlId="formBasicPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 mx-5" controlId="formBasicEmail">
            <h5 className="text-primary"> Invalid Login Credentials</h5>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
