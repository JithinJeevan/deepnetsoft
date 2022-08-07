const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Products = require("./model/productModel");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 6233;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generateAccessToken = (user) => {
  return jwt.sign({ username: user }, "mySecretKey");
};

// Login API

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (username != "" && password != "") {
      if (username === "admin" && password === "123456") {
        const accessToken = generateAccessToken(username);
        res.json({
          username: username,
          password: password,
          accessToken,
        });
      } else {
        res.json("Invalid Credentials");
      }
    } else {
      res.json("Please fill the required fields");
    }
  } catch (error) {
    res.json(error);
  }
});

// Verifying Access token
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      console.log("verified");
      console.log(token);
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

// View All Products Routing

app.get("/api/all-products", verify, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

  console.log("data");
  try {
    await Products.find().then((products) => {
      res.json(products);
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete Routing
app.post("/api/delete/:id", verify, async (req, res) => {
  const id = req.params.id;
  

    await Products.deleteOne({ _id: id });
    res.json("Deleted Successfully");
  
});

// Find one single product details routing
app.get("/api/find/:id", verify, async (req, res) => {
  const id = req.params.id;
  console.log("update",id);
  const data = await Products.find({ _id: id });
  res.send(data);
});



// Edit or Update API
app.post("/api/edit/:id", verify, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  const update = {
    $set: {
      name: req.body.body.formValues.name,
      price: req.body.body.formValues.price,
      quantity: req.body.body.formValues.quantity,
      catagory: req.body.body.catagory
    },
  };

  try {
    await Products.findOneAndUpdate(filter, update, { new: true }).then(
      (products) => {
        res.json({ data: products, staus: "successfully Updated " });
      }
    );
  } catch (error) {
    res.send(error);
  }
});

// Add products routing
app.post("/api/add-products", verify, async (req, res) => {
  console.log("check", req.body);
  var data = req.body.body;
  var check = await Products.find({
    name: data.formValues.name,
    catagory: data.catagory
  });
  console.log("ggg", data.catagory);

  if (check.length === 0) {
    var dbData = new Products({
      name: data.formValues.name,
      price: data.formValues.price,
      quantity: data.formValues.quantity,
      catagory: data.catagory
    });
    console.log("db", dbData);
    var products = await dbData.save();
    res.status(200).json("Added successfully" );
  }
  else{
    res.json(" Product with same catagory exists")
  }
});

// Logout routing
app.post("/api/logout", verify, (req, res) => {
  console.log("logout");
  res.status(200).json("You logged out successfully.");
  // res.cookie("access", "", { maxAge: 1 });
});

app.listen(port, () => {
  console.log("port is running on " + port);
});
