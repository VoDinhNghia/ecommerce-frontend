import React, { useEffect } from "react";
import "./index.css";
import FooterPage from "../commons/footer";
import MenuHomePage from "../menu-home";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { IpropHomePage } from "../../interfaces/home.interface";
import { categoryActions } from "../../store/actions";
import CategoryHomePage from "./category-list";
import ProductListHomePage from "./product-list";

const HomePage = (props: IpropHomePage) => {
  const { dispatch, listCategories = [] } = props;

  const fetchCategories = () => {
    dispatch({
      type: categoryActions.GET_LIST_CATEGORY,
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <MenuHomePage numberCart={0} />
      <Row className="mt-2">
        <Col xl={3} className="HomePageCategoryLeft">
          <CategoryHomePage listCategories={listCategories} />
        </Col>
        <Col xl={9}>
          <ProductListHomePage />
        </Col>
      </Row>
      <FooterPage />
    </div>
  );
};

const mapStateToProp = (state: IstateRedux) => {
  return {
    listCategories: state.CategoryReducer.listCategories,
  };
};

export default connect(mapStateToProp)(HomePage);
