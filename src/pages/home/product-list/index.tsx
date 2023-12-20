import React, { useEffect } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { IpropProductHomePage } from "../../../interfaces/home.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { productActions } from "../../../store/actions";
import { BsCartFill } from "react-icons/bs";

const ProductListHomePage = (props: IpropProductHomePage) => {
  const { categoryId, listProducts = [], dispatch } = props;

  const fetchProducts = () => {
    dispatch({
      type: productActions.GET_LIST_PRODUCT,
      payload: {
        categoryId,
      },
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
        type: productActions.GET_LIST_PRODUCT,
        payload: {
            searchKey,
        }
    });
  }

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

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
        {listProducts?.length > 0 ? listProducts?.map((product) => {
          return (
            <Col xl={3} key={product?.id}>
              <Card className="mt-3 ProductItemHomePage">
                <a href={`#${product?.name}`}>
                  <Card.Img
                    variant="top"
                    className="img-fluid ImageProductHomePage"
                    src={"/images/category.png"}
                  />
                </a>
                <Card.Body className="text-center">
                  <Card.Title className="text-center fs-6">
                    <a href={`#${product?.name}`}>{product?.name}</a>
                  </Card.Title>
                  <Card.Text>
                    <del className="OriginPrice">
                      {product?.price?.toLocaleString("en-US")} đ
                    </del>
                  </Card.Text>
                </Card.Body>
                <span className="text-center">
                  <Button variant="outline-primary" className="w-100">
                    Add to card <BsCartFill />
                  </Button>{" "}
                </span>
              </Card>
            </Col>
          );
        }) : (<p className="mt-2 text-center"><img src="/images/product-not-found.jpg"/></p>)}
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
