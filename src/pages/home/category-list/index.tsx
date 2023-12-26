import React from "react";
import { IpropCategoryHomePage } from "../../../interfaces/home.interface";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";

const CategoryHomePage = (props: IpropCategoryHomePage) => {
  const { listCategories = [], state, setState, t } = props;

  return (
    <div className="rounded-top rounded-bottom">
      <CDBSidebar
        textColor="#333"
        backgroundColor="#f0f0f0"
        className=""
        breakpoint={0}
        toggled={false}
        minWidth={""}
        maxWidth={""}
      >
        <CDBSidebarHeader prefix={null} className="bg-success text-white">
          <div
            className="container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={"/images/category.png"}
              alt=""
              style={{ width: "30px" }}
            />
            <h6 className="ms-2">{t("CATEGORIES")}</h6>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            {listCategories?.map((category) => {
              return (
                <Button
                  variant="outline-success border-start border-end border-top fw-bold"
                  size="sm"
                  key={category?.id}
                  className="text-dark w-100 text-start"
                  onClick={() => setState({ ...state, category: category })}
                >
                  <CDBSidebarMenuItem icon="bars" className="fs-6">
                    {category?.name}
                  </CDBSidebarMenuItem>
                </Button>
              );
            })}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default withTranslation()(CategoryHomePage);
