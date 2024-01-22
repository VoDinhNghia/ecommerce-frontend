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
  caculatorRate,
  calculatorPrice,
  getAvatarProductImage,
  getDiscountProduct,
} from "../../../utils/product.util";
import { Iproduct } from "../../../interfaces/product.inteface";
import { addTocart } from "../../../services/cart.service";
import ProductDetailHomePage from "./product-detail";
import { modalTypes } from "../../../constants/constant";
import { Rating } from "react-simple-star-rating";
import { withTranslation } from "react-i18next";
import { addToCartHomePage } from "../../../utils/cart.util";

const ProductListHomePage = (props: IpropProductHomePage) => {
  const { category, listProducts = [], dispatch, fetchCart, t } = props;
  const [state, setState] = useState({
    title: "",
    isShowModalDetail: false,
    productId: "",
  });

  const addCart = (product: Iproduct) => {
    const { productCheck, productDetail } = addToCartHomePage(product);
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
    const payload = searchKey ? { searchKey } : { categoryId: category?.id };
    setState({ ...state, title: searchKey ? "Search results" : "" });
    dispatch({
      type: productActions.GET_LIST_PRODUCT,
      payload,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <div className="mt-2">
      <Form className="d-flex mb-1">
        <Form.Control
          type="search"
          placeholder={t("SearchProductByName")}
          className=""
          aria-label="Search"
          onChange={(event) => onSearch(event?.target?.value)}
        />
      </Form>
      <Row>
        <p className="mt-2 fs-5 ms-2 text-center text-white fw-bold">
          {t(state?.title) || category?.name}{" "}
          <span className="badge bg-primary rounded-pill">
            {listProducts?.length || 0}
          </span>
        </p>
        {listProducts?.length > 0 ? (
          listProducts?.map((product) => {
            const discounts = getDiscountProduct(product);
            const rates = caculatorRate(product?.rates);
            const calPrice = calculatorPrice(
              product?.price,
              discounts?.discount
            );
            return (
              <Col xl={3} key={product?.id}>
                <Card className="mt-3 ProductItemHomePage">
                  <a href={`#${product?.name}`}>
                    <Card.Img
                      variant="top"
                      className="img-fluid ImageProductHomePage"
                      src={getAvatarProductImage(product)}
                      onClick={() =>
                        setState({
                          ...state,
                          isShowModalDetail: true,
                          productId: product?.id || "",
                        })
                      }
                    />
                    <div className="mask">
                      <div className="d-flex justify-content-start align-items-end h-100">
                        <h5>
                          {discounts ? (
                            <span className="badge bg-danger ms-2 fw-bold">
                              {t("Sale")} ({discounts?.discount}%)
                            </span>
                          ) : (
                            <span className="badge bg-success ms-2 fw-bold">
                              {t("New")}
                            </span>
                          )}
                        </h5>
                      </div>
                    </div>
                  </a>
                  <Card.Body>
                    <Card.Text className="fw-bold text-center">
                      {discounts ? (
                        <>
                          <span className="OriginPrice">
                            {Number(calPrice).toLocaleString("en-US")}đ{" "}
                          </span>{" "}
                          <del className="text-muted">
                            {product?.price?.toLocaleString("en-US")}đ
                          </del>{" "}
                        </>
                      ) : (
                        <span className="OriginPrice">{`${product?.price?.toLocaleString(
                          "en-US"
                        )}đ`}</span>
                      )}
                    </Card.Text>
                    <Card.Title
                      className="fs-6 mt-2"
                      onClick={() =>
                        setState({
                          ...state,
                          isShowModalDetail: true,
                          productId: product?.id || "",
                        })
                      }
                    >
                      <a href={`#${product?.name}`}>{product?.name}</a>
                    </Card.Title>
                    <Card.Text className="fw-bold">
                      {t("Available")}: {product?.quantity}
                    </Card.Text>
                    <Card.Text className="fw-bold">
                      <Rating
                        initialValue={rates || 0}
                        size={16}
                        allowHover={false}
                      />{" "}
                      ({product?.rates?.length})
                    </Card.Text>
                  </Card.Body>
                  <span className="text-center">
                    <Button className="w-100" onClick={() => addCart(product)}>
                      <BsCartFill /> {t("AddToCard")}
                    </Button>{" "}
                  </span>
                </Card>
              </Col>
            );
          })
        ) : (
          <div className="mt-2 text-center">
            <img
              src="/images/product-not-found.jpg"
              width="70%"
              height="400px"
            />
          </div>
        )}
      </Row>
      <ProductDetailHomePage
        type={modalTypes.VIEW}
        productId={state.productId}
        isShowModal={state.isShowModalDetail}
        onCloseModal={() => setState({ ...state, isShowModalDetail: false })}
        addToCart={(product: Iproduct) => addCart(product)}
        fetchProducts={() => fetchProducts()}
      />
    </div>
  );
};

export default connect((state: IstateRedux) => ({
  listProducts: state.ProductReducer.listProducts,
}))(withTranslation()(ProductListHomePage));
