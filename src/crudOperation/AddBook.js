import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Form, InputGroup } from "react-bootstrap";
import Services from "./Services";

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [message, setMessage] = useState({ error: false, msg: "" });

  // submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    // make an object with all this state
    const newBook = {
      title,
      author,
      status,
    };

    try {
      if (id !== undefined && id !== "") {
        await Services.updateBook(id, newBook); // update book
        setBookId("");
        setMessage({ error: false, msg: "updated successfully!" });
      } else {
        await Services.addBooks(newBook); // add books
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setAuthor("");
  }

  // edit handler
  async function editHandler() {
    setMessage("");
    try {
      const docSnap = await Services.getBook(id); // edit book
      // console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  }

  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book Title"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Book Author"
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button variant="success" onClick={() => setStatus("Available")}>
              Available
            </Button>
            <Button variant="danger" onClick={() => setStatus("Not Available")}>
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
