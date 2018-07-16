import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Employee from "./pages/Employee";
import Admin from "./pages/Admin";

const App = () => (

  <Router>
    <div>

      <Route exact path="/" component={Employee} />
      <Route exact path="/admin" component={Admin} />

    </div>
  </Router>
);

export default App;
