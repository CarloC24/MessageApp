import React, { useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import io from "socket.io-client";

function App() {
  // on component mount connect to our websocket!
  useEffect(() => {
    console.log("socket connecting");
    /*
    init our socket
    socket will trigger socket.on("connection") on the backend!
    */
    const socket = io.connect("http://localhost:5000");
    // this is the socket.emit("news on the backend!")
    socket.on("news", function(data) {
      console.log(data, "receiving data");
    });

    //trying out to make a zoom room api
    axios
      .get("https://api.zoom.us/v2/users")
      .then(res => {
        console.log(res);
        alert("succesful");
      })
      .catch(err => {
        console.error(err);
        alert("unsuccessful");
      });
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Socket Connecting!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
