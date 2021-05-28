/******************************************************************************/
/*   Author     : Ahmed Gamal                                                 */
/*   Description: Server Code for Weather Journal Project                     */
/*   Version    : v 1.0                                                       */
/*   Date       : 28 May 2021                                                 */
/******************************************************************************/
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
// Cors for cross origin allowance
// CORS allows us to manage a Cross-origin resource sharing policy so that our front end can talk to the server.
const cors = require("cors");

// Enable All CORS Requests
app.use(cors());

//body-parser allow the backend to access JSON data sent from the client using request.body in POST route handler.
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

// Callback function to complete GET '/all'
const getAll = (req, res) => res.status(200).send(projectData);
// GET Route
app.get("/all", getAll);


// Callback function to complete POST '/add'
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
// GET Route
app.post("/add", postData);

const myPort = 5000;
const hostname = "127.0.0.1";

// function to test the server 
const listening = () => {
    console.log("The Server is running now.");
    console.log(`running on http://${hostname}:${myPort}/`);
}

// spin up the server
app.listen(myPort, listening);
