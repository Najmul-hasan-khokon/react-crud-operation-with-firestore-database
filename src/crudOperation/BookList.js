import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Services from "./Services";

const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks(); // page open holei getBook funciton call hobe.
  }, []);

  // gets all the data
  async function getBooks() {
    const data = await Services.getAllBooks();
    // console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  // delete data
  async function deleteHandler(id) {
    await Services.deleteBook(id);
    getBooks(); // kichu delete holei getBooks function call hoye page refress hobe.
  }

  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={() => getBookId(book.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={() => deleteHandler(book.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* <Services /> */}
    </>
  );
};

export default BooksList;
