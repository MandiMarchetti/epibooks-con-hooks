import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import SingleBookFunction from "./SingleBookFunction";
import CommentAreaFunction from "./CommentAreaFunction";

const BookListFunction = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const changeSelectedBook = (asin) => {
    setSelectedBook(asin);
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={4} className="text-center">
              <Form.Group>
                <Form.Control
                  type="search"
                  placeholder="Cerca un libro"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2 mt-3">
            {books
              .filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((b) => (
                <Col xs={12} md={4} key={b.asin}>
                  <SingleBookFunction book={b} selectedBook={selectedBook} changeSelectedBook={changeSelectedBook} />
                </Col>
              ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentAreaFunction asin={selectedBook} />
        </Col>
      </Row>
    </>
  );
};

export default BookListFunction;
