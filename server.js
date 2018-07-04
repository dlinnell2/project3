const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 5000;
const routes = ("./routes")

//Define middleware
app.use(express.json());
app.use(fileUpload());

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// API Routes
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