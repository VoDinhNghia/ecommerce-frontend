import React, { useEffect, useState } from "react";
import "./index.css";
import FooterPage from "../commons/footer";
import MenuHomePage from "../menu-home";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { IpropHomePage } from "../../interfaces/home.interface";
import { categoryActions } from "../../store/actions";
import CategoryHomePage from "./category-list";
import ProductListHomePage from "./product-list";
import { getCart } from "../../services/cart.service";
import SlideImgAdvHomePage from "./slide-adv";

const HomePage = (props: IpropHomePage) => {
  const { dispatch, listCategories = [] } = props;

  const [state, setState] = useState({
    category: null,
    numberCart: 0,
  });

  const fetchCart = () => {
    const cart = getCart();
    setState({ ...state, numberCart: cart?.length || 0 });
  };

  const fetchCategories = () => {
    dispatch({
      type: categoryActions.GET_LIST_CATEGORY,
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="BackgroundGradientHomePage overflow-hidden">
      <MenuHomePage numberCart={state.numberCart || getCart()?.length} />
      <SlideImgAdvHomePage />
      <Container fluid>
        <Row className="mt-2 mb-4">
          <Col xl={3} className="HomePageCategoryLeft">
            <CategoryHomePage
              listCategories={listCategories}
              state={state}
              setState={setState}
            />
          </Col>
          <Col xl={9}>
            <ProductListHomePage
              category={state.category || listCategories[0]}
              fetchCart={() => fetchCart()}
            />
          </Col>
        </Row>
      </Container>
      <FooterPage />
    </div>
  );
};

export default connect((state: IstateRedux) => ({
  listCategories: state.CategoryReducer.listCategories,
}))(HomePage);
