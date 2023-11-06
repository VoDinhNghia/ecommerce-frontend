import React from "react";
import ForbidenPage from "../../commons/forbiden";
import { validateRoleSa } from "../../../utils/permission.util";
import { Container } from "rsuite";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";

const CategoryMgtPage = () => {
  const isRoleSa = validateRoleSa();
  return (
    <div>
      {isRoleSa ? (
        <div className="show-fake-browser slidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3">
              <p>Content category page</p>
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

export default CategoryMgtPage;
