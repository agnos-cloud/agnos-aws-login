import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./login";

export default function Root(props) {
  return (
    <Router>
        <Route path="/">
          <Login />
        </Route>
    </Router>
  );
}
