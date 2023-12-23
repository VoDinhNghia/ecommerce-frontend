import React, { useEffect, useState } from "react";
import "./index.css";
import MenuHomePage from "../menu-home";
import FooterPage from "../commons/footer";
import { getCart } from "../../services/cart.service";
import {
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Table,
} from "@mui/material";
import HeaderTableCommon from "../commons/header-table";
import { headerTableCart } from "../../utils/cart.util";
import { Container, ButtonGroup, Button, Form } from "react-bootstrap";
import { Iproduct } from "../../interfaces/product.inteface";
import { BsPlus, BsDashLg } from "react-icons/bs";

const CartDetailPage = () => {
  const [state, setState] = useState({
    numberCart: 0,
    carts: [],
  });
  const { numberCart, carts } = state;
  const fetchCarts = () => {
    const carts = getCart();
    setState({ ...state, numberCart: carts?.length || 0, carts });
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <div>
      <MenuHomePage numberCart={numberCart} />
      <Container className="mt-2 mb-3">
        <TableContainer>
          <Table stickyHeader aria-label="cart table">
            <HeaderTableCommon headerList={headerTableCart} />
            <TableBody>
              {carts?.map((cart: Iproduct, index) => {
                return (
                  <TableRow key={cart?.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="text-primary">{cart?.name}</TableCell>
                    <TableCell>
                      <img src={cart?.images} alt="" width={100} height={50} />
                    </TableCell>
                    <TableCell>
                      {cart?.price?.toLocaleString("en-US")}đ
                    </TableCell>
                    <TableCell>{cart?.quantity}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button
                          variant="outline-primary"
                          className="me-1"
                          size="sm"
                        >
                          <BsPlus />
                        </Button>{" "}
                        <Form.Control
                          type="number"
                          className="FormControl"
                          size="sm"
                        />
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="ms-1"
                        >
                          <BsDashLg />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <FooterPage />
    </div>
  );
};

export default CartDetailPage;
