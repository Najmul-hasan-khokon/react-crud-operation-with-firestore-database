import React from "react";
import { Link } from "react-router-dom";
import Todo from "../crudOperation/Todo";

export default function Home() {
  return (
    <div>
      <Todo />
      <div style={{ textAlign: "center" }}>
        <Link to="/prectice">Go To Another Todo</Link>
        {/* prectice crud component  */}
      </div>
    </div>
  );
}
