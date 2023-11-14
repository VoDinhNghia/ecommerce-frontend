import React from "react";
import { Container } from "rsuite";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";
import { validateRoleSa } from "../../../utils/permission.util";
import ForbidenPage from "../../commons/forbiden";
import TitleHeaderPage from "../../commons/title-header";
import AddAndSearchTable from "../../commons/add-search-table";

const ProductMgtPage = () => {
  const isRoleSa = validateRoleSa();

  return (
    <div>
      {isRoleSa ? (
        <div className="show-fake-browser slidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3">
              <TitleHeaderPage title="Products Management" />
              <AddAndSearchTable
                title="Add product"
              />
            </Container>
          </Container>
          <FooterPage />
        </div>
      ) : (
        <ForbidenPage />
      )}
    </div>
  );
};

export default ProductMgtPage;
