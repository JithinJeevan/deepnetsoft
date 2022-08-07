import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AddProduct from "./components/AddProduct";
import Dashboard from "./components/Dashboard";
import UpdateData from "./components/UpdateData";
import Login from "./page/Login"


function App() {

  const [id,setId]=useState("");
  return (
    <BrowserRouter>
    <div className="App">
     <Routes>
     <Route element={<Login/>} path="/" />
     <Route element={<Dashboard id={id} setId={setId}/>} path="/dashboard" />
     <Route element={<AddProduct/>} path="/add-products" />
     <Route element={<UpdateData id={id}/>} path="/update-product" />
      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
