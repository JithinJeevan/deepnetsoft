import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Button,
  Table,
  ListGroup,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function UpdateData({ id }) {
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [selectValue, setSelectValue] = useState("");

  const accessToken = Cookies.get("access");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const getData = async () => {
    await axios
      .get(`http://localhost:6233/api//find/${id}`, {
        headers: { Authorization: "Bearer " + accessToken }
      })
      .then((response) => {
        console.log("data", response.data);
        setFormValues({ name: response.data.name, price: response.data.price, quantity: response.data.quantity });
      });
  };

  useEffect(()=>{
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(
        `http://localhost:6233/api/edit/${id}`,
        { body: { formValues, catagory: selectValue } },
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      )
      .then((response) => {
        console.log("data", response.data);
      });

    setFormValues({ username: "", password: "" });
  };

  const navigate = useNavigate();

  const logout = async () => {
    // await  axios.post(`http://localhost:6233/api/logout`, {
    //       headers: { Authorization: "Bearer " + accessToken }
    //     })

    Cookies.set("access", "");
    navigate("/", { replace: true });
  };

  const addProduct = () => {
    navigate("/add-products", { replace: true });
  };

  const dashBoard = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/dashboard">Product App</Navbar.Brand>
          <Nav className="ms-5 ">
            <Nav.Link href=" " active onClick={dashBoard}>
              Home
            </Nav.Link>
            <Nav.Link href="" onClick={addProduct}>
              Add Products
            </Nav.Link>
            <Button onClick={logout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>

      <Card
        className="w-50 ms-5 mt-5 bg-transparent"
        style={{ left: "22%", top: "10vh" }}
      >
        <Form className="w-100 ms-1 my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mx-5" controlId="formBasicEmail">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Producet Name"
              name="name"
              onChange={handleChange}
              value={formValues.name}
            />
          </Form.Group>

          <Form.Group className="mb-3 mx-5" controlId="formBasicPassword">
            <Form.Label className="text-white">Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleChange}
              value={formValues.price}
            />
          </Form.Group>

          <Form.Group className="mb-3 mx-5" controlId="formBasicPassword">
            <Form.Label className="text-white">Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Quantity"
              name="quantity"
              onChange={handleChange}
              value={formValues.quantity}
            />
          </Form.Group>

          <Form.Group
            className=" mt-3 mb-3  mx-5 "
            controlId="formBasicPassword"
          >
            <Form.Select
              aria-label="Select"
              className="mt-3"
              onChange={(e) => {
                setSelectValue(e.target.value);
              }}
              value={selectValue}
            >
              <option>Catagory</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>

        <Button
          variant="primary"
          type="submit"
          onClick={dashBoard}
          className="w-25 mb-4"
          style={{ marginLeft: "38%" }}
        >
          Back
        </Button>
      </Card>
    </div>
  );
}

export default UpdateData;
