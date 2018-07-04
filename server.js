const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const routes = require("./routes");
const app = express();
const port = process.env.PORT || 5000;

//Define middleware
app.use(express.json());
app.use(fileUpload());


app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/clockface");

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));