import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Counter from "./components/Counter";
import Home from "./components/Home";
import UseReducer from "./components/UseReducer";
import UserFetch from "./components/UserFetch";
import { Prectice } from "./Prectice";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/prectice" element={<Prectice />} />
        <Route path="/user" element={<UserFetch />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/reducer" element={<UseReducer />} />
      </Routes>
    </Router>
  );
}
