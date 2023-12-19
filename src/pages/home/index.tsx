import React, { useEffect } from "react";
import "./index.css";
import FooterPage from "../commons/footer";
import MenuHomePage from "../menu-home";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import { IpropHomePage } from "../../interfaces/home.interface";
import { categoryActions } from "../../store/actions";

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
          <CDBSidebar
            textColor="#333"
            backgroundColor="#f0f0f0"
            className=""
            breakpoint={0}
            toggled={false}
            minWidth={""}
            maxWidth={""}
          >
            <CDBSidebarHeader prefix={null}>
              <div
                className="container"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={"/images/category.png"}
                  alt=""
                  style={{ width: "30px" }}
                />
                <h6 className="ms-2">CATEGORIES</h6>
              </div>
            </CDBSidebarHeader>
            <CDBSidebarContent>
              <CDBSidebarMenu>
                {listCategories?.map((category) => {
                  return (
                    <CDBSidebarMenuItem icon="bars" key={category?.id}>
                      {category?.name}
                    </CDBSidebarMenuItem>
                  );
                })}
              </CDBSidebarMenu>
            </CDBSidebarContent>
          </CDBSidebar>
        </Col>
        <Col xl={9}>Right</Col>
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
