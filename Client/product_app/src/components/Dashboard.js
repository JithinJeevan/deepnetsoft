/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Form, Button, Table, ListGroup } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UpdateData from "./UpdateData";

function Dashboard({ id, setId }) {
  const [data, setData] = useState([]);
  
  const [checkbox, setCheckBox] = useState(false);
  let filteredData = [];
  const [searchValue, setSearchValue] = useState("");
  const [optionValue, setOptionValue] = useState("");

useEffect(()=>{console.log("sho",id)},[id]);
  
  filteredData = data.filter((product) => {
    const filter1 = product.name
      .toLowerCase()
      .indexOf(searchValue.toLowerCase());

    const filter2 = product.catagory
      .toLowerCase()
      .indexOf(optionValue.toLowerCase());

    return filter1 > -1 && filter2 > -1;
  });

  const navigate = useNavigate();

  const accessToken = Cookies.get("access");

  useEffect(() => {
    display();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const display = async () => {
    await axios
      .get(`http://localhost:6233/api/all-products`, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((response) => {
        console.log("hi", response.data);
        setData(response.data);
      });
  };

  const deleteData = async () => {
    await axios
      .post(`http://localhost:6233/api/delete/${id}`, {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((response) => {
        console.log("id",id)
        console.log("hiiii", response);
      });

     
  };

  const logout = async () => {
    // await  axios.post(`http://localhost:6233/api/logout`, {
    //       headers: { Authorization: "Bearer " + accessToken }
    //     })

    Cookies.set("access", "");
    navigate("/", { replace: true });
  };

  const addProduct = () => {
    navigate("/add-products", { replace: true });
    setCheckBox(!checkbox);
  };

  const updateProduct = () => {
    if(checkbox===true){
      navigate("/update-product", { replace: true });
    }
    
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/dashboard">Product App</Navbar.Brand>
          <Nav className="ms-5 ">
            <Nav.Link href=" " active>
              Home
            </Nav.Link>
            <Nav.Link href="" onClick={addProduct}>
              Add Products
            </Nav.Link>
            <Button onClick={logout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="mt-5">
        <Row>
          <Col className="col-8"></Col>
          <Col className="col-3 ms-5">
            <Button
              variant="primary"
              type="submit"
              className="ms-5"
              onClick={addProduct}
            >
              Add Products
            </Button>
          </Col>
          <Col className="col-1"></Col>
        </Row>
        <Row className="mt-4">
          <Col className="col-1"></Col>
          <Col className="col-5">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className=""
                aria-label="Search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              />
            </Form>
          </Col>
          <Col className="col-3">
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setOptionValue(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </Form.Select>
          </Col>
          <Col className="col-2">
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
          <Col className="col-1"></Col>
        </Row>

        <Row>
          <Col className="mx-5">
            <Table className="w-100 mx-3 mt-5">
              <tbody>
                <tr
                  style={{ backgroundColor: "#DFDFDF" }}
                  borderless
                  responsive
                >
                  <td>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" />
                    </Form.Group>
                  </td>
                  <td>Product Name</td>
                  <td>Price</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
                {filteredData.map((data, i) => (
                  <tr key={i}>
                    <td>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          onClick={() => {
                            setCheckBox(!checkbox);
                          }}
                        />
                      </Form.Group>
                    </td>
                    <td>{data.name}</td>
                    <td>{data.price}</td>
                    <td>
                      <Button
                        onClick={() => {
                          setId(data._id);
                          updateProduct();
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          
                          setId(data._id);
                          deleteData();
                          display();
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="col-12 mx-3">
            <h3 className="text-primary px-5">Latest Products</h3>
          </Col>
        </Row>
        {data.length > 0 ? (
          <Row className="mx-5">
            <Col className="col-3 ">
              <Card style={{ width: "15rem" }}>
                <Card.Header>Product</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>{data[data.length - 1].name}</ListGroup.Item>
                  <ListGroup.Item>
                    Price: {data[data.length - 1].price} RS.
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col className="col-3 ">
              <Card style={{ width: "15rem" }}>
                <Card.Header>Product</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>{data[data.length - 1].name}</ListGroup.Item>
                  <ListGroup.Item>
                    Price: {data[data.length - 1].price} RS.
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col className="col-3 ">
              <Card style={{ width: "15rem" }}>
                <Card.Header>Product</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>Name: </ListGroup.Item>
                  <ListGroup.Item>Price: </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col className="col-3 ">
              <Card style={{ width: "15rem" }}>
                <Card.Header>Product</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>Name: </ListGroup.Item>
                  <ListGroup.Item>Price: </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
}

export default Dashboard;
