import React, { useEffect, useState } from "react";
import { Card, Form, Button, Table, ListGroup } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function AddProduct(props) {
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [selectValue, setSelectValue] = useState("");
  const [data, setData] = useState("");

  const accessToken = Cookies.get("access");

  console.log("add", accessToken);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues, selectValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post(
        "http://localhost:6233/api/add-products",
        { body: { formValues, catagory: selectValue } },
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      )
      .then((response) => {
        console.log("data", response);
        setData(response.data)
      });

    setFormValues({ name: "", price: "", quantity: "" });
    setSelectValue("");
  };

  const navigate = useNavigate();

  const logout = async () => {
    // await  axios.post(`http://localhost:6233/api/logout`, {
    //       headers: { Authorization: "Bearer " + accessToken }
    //     })

    Cookies.set("access", " 1");
    navigate("/", { replace: true });
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
            <Nav.Link href=" " onClick={dashBoard}>
              Home
            </Nav.Link>
            <Nav.Link href="" active>
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
              value={formValues.name}
              onChange={handleChange}
              required
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
              required
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
              required
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
              required
            >
              <option>Catagory</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </Form.Select>
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Add
          </Button>

          <Form.Text>{data}</Form.Text>
        </Form>
      </Card>
    </div>
  );
}

export default AddProduct;
