import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../firebase"; // firebase config
import AddBook from "./AddBook";
import BooksList from "./BookList";

export default function Todo() {
  const [bookId, setBookId] = useState("");

  function getBookIdHandler(id) {
    // after getting id pass to addBook component
    setBookId(id);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Simple Todo</h1>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            {/* pass the getBookId function for getting id */}
            <BooksList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
