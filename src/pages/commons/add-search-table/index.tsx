import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import {
  IeventOnchangeInput,
  IpropAddAndSearchTable,
} from "../../../interfaces/common.interface";
import { BsPlusCircle } from "react-icons/bs";

const AddAndSearchTable = (props: IpropAddAndSearchTable) => {
  const {
    title,
    onSearch,
    onShowAdd,
    titleSearch = "Search by name...",
    disableBtnAdd = false,
    disableSearch = false,
  } = props;

  return (
    <div className="mb-3 fs-6">
      <Row>
        <Col xl={3} className="text-center">
          <Card className="border-0">
            <Card.Body>
              <Button
                variant="contained"
                startIcon={<BsPlusCircle />}
                color="primary"
                className="w-100"
                onClick={() => onShowAdd()}
                disabled={disableBtnAdd}
              >
                {title}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={9}>
          <Card className="border-0">
            <Card.Body>
              <Form.Control
                disabled={disableSearch}
                type="text"
                placeholder={titleSearch}
                onChange={(e: IeventOnchangeInput) => onSearch(e.target.value)}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddAndSearchTable;
