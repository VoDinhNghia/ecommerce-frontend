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

const CategoryHomePage = (props: IpropCategoryHomePage) => {
  const { listCategories = [], state, setState } = props;

  return (
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
          <img src={"/images/category.png"} alt="" style={{ width: "30px" }} />
          <h6 className="ms-2">CATEGORIES</h6>
        </div>
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          {listCategories?.map((category) => {
            return (
              <CDBSidebarMenuItem icon="" key={category?.id} className="fs-6">
                <Button
                  variant="outline-light"
                  className="text-dark w-100 text-start"
                  onClick={() => setState({ ...state, categoryId: category?.id })}
                >
                  {category?.name}
                </Button>
              </CDBSidebarMenuItem>
            );
          })}
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default CategoryHomePage;
