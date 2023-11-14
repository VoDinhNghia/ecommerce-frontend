import React from "react";
import { Container } from "rsuite";
import MenuPage from "../../commons/menu";
import FooterPage from "../../commons/footer";
import { validateRoleSa } from "../../../utils/permission.util";
import ForbidenPage from "../../commons/forbiden";
import TitleHeaderPage from "../../commons/title-header";
import AddAndSearchTable from "../../commons/add-search-table";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
} from "@mui/material";
import { connect } from "react-redux";
import { IpropProductPage } from "../../../interfaces/product.inteface";
import { IstateRedux } from "../../../interfaces/common.interface";

const ProductMgtPage = (props: IpropProductPage) => {
  const { dispatch, listProducts = [], totalProduct = 0 } = props;
  const isRoleSa = validateRoleSa();

  return (
    <div>
      {isRoleSa ? (
        <div className="show-fake-browser slidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3">
              <TitleHeaderPage title="Products Management" />
              <AddAndSearchTable title="Add product" />
              <TableContainer></TableContainer>
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

const mapStateToProps = (state: IstateRedux) => {
  return {
    listProducts: state.ProductReducer.listProducts,
    totalProduct: state.ProductReducer.totalProduct,
  };
};

export default connect(mapStateToProps)(ProductMgtPage);
