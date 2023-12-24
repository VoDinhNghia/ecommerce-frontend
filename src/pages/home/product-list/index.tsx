/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import React, { useEffect, useState } from "react";
import "./index.css";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { IpropProductHomePage } from "../../../interfaces/home.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { productActions } from "../../../store/actions";
import { BsCartFill } from "react-icons/bs";
import {
  calculatorPrice,
  getAvatarProductImage,
  getDiscountProduct,
} from "../../../utils/product.util";
import { Iproduct } from "../../../interfaces/product.inteface";
import { getCart, addTocart } from "../../../services/cart.service";

const ProductListHomePage = (props: IpropProductHomePage) => {
  const { category, listProducts = [], dispatch, fetchCart } = props;
  const [state, setState] = useState({
    title: "",
  });

  const addCart = (product: Iproduct) => {
    const carts = getCart();
    const srcImage = getAvatarProductImage(product);
    const checkDiscount = getDiscountProduct(product);
    const productCheck = carts?.find(
      (cart: { id: string }) => cart?.id === product?.id
    );
    const productDetail = {
      name: product?.name,
      images: srcImage,
      id: product?.id,
      price: checkDiscount
        ? calculatorPrice(product?.price, checkDiscount?.discount)
        : product?.price,
    };
    if (productCheck?.quantity >= product?.quantity) {
      NotificationManager.error(
        "quantity in warehouse is not enough",
        "Add to cart",
        4000
      );
    } else {
      addTocart(productDetail);
      fetchCart();
      NotificationManager.success("Add to cart success", "Add to cart", 4000);
    }
  };

  const fetchProducts = () => {
    dispatch({
      type: productActions.GET_LIST_PRODUCT,
      payload: {
        categoryId: category?.id,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    if (searchKey) {
      dispatch({
        type: productActions.GET_LIST_PRODUCT,
        payload: {
          searchKey,
        },
      });
      setState({ ...state, title: "Search results" });
    } else {
      dispatch({
        type: productActions.GET_LIST_PRODUCT,
        payload: {
          categoryId: category?.id,
        },
      });
      setState({ ...state, title: "" });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <div className="mt-2">
      <Card className="bg-light">
        <Card.Body>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search product by name..."
              className=""
              aria-label="Search"
              onChange={(event) => onSearch(event?.target?.value)}
            />
          </Form>
        </Card.Body>
      </Card>
      <Row>
        <div className="mt-2 fs-5 ms-2 text-center fw-bold">
          {state?.title || category?.name}{" "}
          <span className="badge bg-primary rounded-pill">
            {listProducts?.length || 0}
          </span>
        </div>
        {listProducts?.length > 0 ? (
          listProducts?.map((product) => {
            const discounts = getDiscountProduct(product);
            return (
              <Col xl={4} key={product?.id}>
                <Card className="mt-3 ProductItemHomePage">
                  <a href={`#${product?.name}`}>
                    <Card.Img
                      variant="top"
                      className="img-fluid ImageProductHomePage"
                      src={getAvatarProductImage(product)}
                    />
                  </a>
                  <Card.Body className="text-center">
                    <Card.Title className="text-center fs-6">
                      <a href={`#${product?.name}`}>{product?.name}</a>
                    </Card.Title>
                    <Card.Text>
                      <span>
                        {discounts
                          ? Number(
                              calculatorPrice(
                                product?.price,
                                discounts?.discount
                              )
                            ).toLocaleString("en-US")
                          : product?.price?.toLocaleString("en-US")}
                        đ
                      </span>{" "}
                      {discounts ? (
                        <del className="OriginPrice">
                          (<i>{product?.price?.toLocaleString("en-US")}đ</i>)
                        </del>
                      ) : null}
                    </Card.Text>
                  </Card.Body>
                  <span className="text-center">
                    <Button
                      variant="outline-primary"
                      className="w-100"
                      onClick={() => addCart(product)}
                    >
                      Add to card <BsCartFill />
                    </Button>{" "}
                  </span>
                </Card>
              </Col>
            );
          })
        ) : (
          <p className="mt-2 text-center">
            <img
              src="/images/product-not-found.jpg"
              width="70%"
              height="400px"
            />
          </p>
        )}
      </Row>
    </div>
  );
};

const mapStateToProp = (state: IstateRedux) => {
  return {
    listProducts: state.ProductReducer.listProducts,
  };
};

export default connect(mapStateToProp)(ProductListHomePage);
