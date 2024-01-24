/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import React, { useEffect, useState } from "react";
import "./index.css";
import MenuHomePage from "../menu-home";
import FooterPage from "../commons/footer";
import {
  addTocart,
  caculatorTotalPrice,
  getCart,
  removeCart,
} from "../../services/cart.service";
import { Button, Col } from "react-bootstrap";
import { Iproduct } from "../../interfaces/product.inteface";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import {
  IformAddToCart,
  IpropCartDetailPage,
} from "../../interfaces/cart.interface";
import { productActions } from "../../store/actions";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { routes } from "../../constants/constant";

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
    fetchAndSetQuantity();
  };

  const subtractCart = (product: Iproduct) => {
    removeCart(product, numberQuantity > 0 ? numberQuantity : 1);
    fetchAndSetQuantity();
    NotificationManager.success(
      `${
        product?.quantity - 1 === 0 ? "remove" : "subtract quantity"
      } product success`,
      "Subtract cart",
      3000
    );
  };

  const fetchAndSetQuantity = () => {
    setTimeout(() => {
      fetchCarts();
    }, 70);
    setState({ ...state, numberQuantity: 0 });
  };

  const clearCarts = (product: Iproduct) => {
    removeCart(product, product?.quantity);
    setTimeout(() => {
      fetchCarts();
    }, 70);
  };

  const totalPrice = caculatorTotalPrice();

  useEffect(() => {
    fetchCarts();
    fetchProducts();
  }, []);

  const ProductsItem = (
    <Col xl={7} className="px-5 py-4">
      <MDBTypography
        tag="h3"
        className="mb-5 pt-2 text-center fw-bold text-uppercase"
      >
        Your products
      </MDBTypography>

      {carts?.map((cart: Iproduct) => {
        return (
          <div className="d-flex align-items-center mb-5" key={cart?.id}>
            <div className="flex-shrink-0">
              <MDBCardImage
                src={cart?.images}
                fluid
                style={{ width: "150px" }}
                alt="Generic placeholder image"
              />
            </div>

            <div className="flex-grow-1 ms-3">
              <Button
                className="float-end"
                size="sm"
                variant="outline-danger"
                onClick={() => clearCarts(cart)}
              >
                <MDBIcon fas icon="times" />
              </Button>
              <MDBTypography tag="h5" className="text-primary">
                {cart?.name}
              </MDBTypography>
              <MDBTypography tag="h6">Quantity: {cart?.quantity}</MDBTypography>

              <div className="d-flex align-items-center">
                <p className="fs-6 fw-bold mb-0 me-5 pe-3 text-danger">
                  {cart?.price?.toLocaleString("en-US")} đ
                </p>

                <div className="def-number-input number-input safari_only">
                  <button
                    className="minus"
                    onClick={() => subtractCart(cart)}
                  ></button>
                  <input
                    className="quantity fw-bold text-black"
                    min={0}
                    defaultValue={1}
                    type="number"
                    onChange={(e: IformAddToCart) =>
                      setState({
                        ...state,
                        numberQuantity: Number(e?.target?.value),
                      })
                    }
                  />
                  <button
                    className="plus"
                    onClick={() => addCart(cart)}
                  ></button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <hr
        className="mb-4"
        style={{
          height: "2px",
          backgroundColor: "#1266f1",
          opacity: 1,
        }}
      />
      <div
        className="d-flex justify-content-between p-2 mb-2"
        style={{ backgroundColor: "#e1f5fe" }}
      >
        <MDBTypography tag="h5" className="fw-bold mb-0">
          Total:
        </MDBTypography>
        <MDBTypography tag="h5" className="fw-bold mb-0">
          {totalPrice?.toLocaleString("en-US")} đ
        </MDBTypography>
      </div>
    </Col>
  );

  const PaymentContent = (
    <Col xl={5} className="px-5 py-4">
      <MDBTypography
        tag="h3"
        className="mb-5 pt-2 text-center fw-bold text-uppercase"
      >
        Payment
      </MDBTypography>
      <form className="mb-5">
        <MDBTypography
          tag="h5"
          className="fw-bold mb-5"
          style={{ position: "absolute", bottom: "0" }}
        >
          <a href={routes.home}>
            <MDBIcon fas icon="angle-left me-2" />
            Back to shopping
          </a>
        </MDBTypography>
      </form>
    </Col>
  );

  return (
    <div>
      <MenuHomePage numberCart={numberCart} />
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer>
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard
                className="shopping-cart"
                style={{ borderRadius: "15px" }}
              >
                <MDBCardBody className="text-black">
                  <MDBRow>
                    {ProductsItem}
                    {PaymentContent}
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <FooterPage />
    </div>
  );
};

export default connect((state: IstateRedux) => ({
  listProducts: state.ProductReducer.listProducts,
}))(CartDetailPage);
