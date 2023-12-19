import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";

const ProductListHomePage = () => {
  return (
    <div className="mt-2 me-2">
      <Card className="bg-light">
        <Card.Body>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search product by name..."
              className="me-2"
              aria-label="Search"
            />
            <Button>
              <CiSearch />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductListHomePage;
