/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import React, { useEffect, useState } from "react";
import "./index.css";
import MenuHomePage from "../menu-home";
import FooterPage from "../commons/footer";
import { addTocart, getCart, removeCart } from "../../services/cart.service";
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
import { BsPlus, BsDashLg, BsTrash } from "react-icons/bs";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import {
  IformAddToCart,
  IpropCartDetailPage,
} from "../../interfaces/cart.interface";
import { productActions } from "../../store/actions";

const CartDetailPage = (props: IpropCartDetailPage) => {
  const { dispatch, listProducts } = props;
  const [state, setState] = useState({
    numberCart: 0,
    carts: [],
    numberQuantity: 0,
  });
  const { numberCart, carts, numberQuantity } = state;
  const fetchCarts = () => {
    const carts = getCart();
    setState({ ...state, numberCart: carts?.length || 0, carts });
  };

  const fetchProducts = () => {
    dispatch({
      type: productActions.GET_LIST_PRODUCT,
    });
  };

  const addCart = (product: Iproduct) => {
    const findProduct = listProducts?.find((pro) => pro?.id === product?.id);
    if (
      findProduct?.quantity < numberQuantity ||
      findProduct?.quantity < product?.quantity
    ) {
      NotificationManager.error(
        "quantity number in warehouse is not enough",
        "Add to cart",
        4000
      );
    } else {
      addTocart(product, numberQuantity > 0 ? numberQuantity : 1);
      NotificationManager.success("Add to cart success", "Add to cart", 3000);
    }
    setTimeout(() => {
      fetchCarts();
    }, 70);
    setState({ ...state, numberQuantity: 0 });
  };

  const subtractCart = (product: Iproduct) => {
    removeCart(product, numberQuantity > 0 ? numberQuantity : 1);
    setTimeout(() => {
      fetchCarts();
    }, 70);
    NotificationManager.success(
      `${
        product?.quantity - 1 === 0 ? "remove" : "subtract quantity"
      } product success`,
      "Subtract cart",
      3000
    );
    setState({
      ...state,
      numberQuantity: 0,
    });
  };

  const clearCarts = (product: Iproduct) => {
    removeCart(product, product?.quantity);
    setTimeout(() => {
      fetchCarts();
    }, 70);
  };

  useEffect(() => {
    fetchCarts();
    fetchProducts();
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
                    <TableCell>
                      <img src={cart?.images} alt="" width={100} height={50} />
                    </TableCell>
                    <TableCell className="text-primary">{cart?.name}</TableCell>
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
                          onClick={() => addCart(cart)}
                        >
                          <BsPlus />
                        </Button>{" "}
                        <Form.Control
                          type="number"
                          className="FormControl"
                          size="sm"
                          defaultValue={1}
                          onChange={(e: IformAddToCart) =>
                            setState({
                              ...state,
                              numberQuantity: Number(e?.target?.value),
                            })
                          }
                        />
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="ms-1"
                          onClick={() => subtractCart(cart)}
                        >
                          <BsDashLg />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => clearCarts(cart)}
                      >
                        <BsTrash />
                      </Button>
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

export default connect((state: IstateRedux) => ({
  listProducts: state.ProductReducer.listProducts,
}))(CartDetailPage);
