import React from "react";
import { IpropCategoryHomePage } from "../../../interfaces/home.interface";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
} from "cdbreact";

const CategoryHomePage = (props: IpropCategoryHomePage) => {
  const { listCategories = [] } = props;

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
                {category?.name}
              </CDBSidebarMenuItem>
            );
          })}
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default CategoryHomePage;
