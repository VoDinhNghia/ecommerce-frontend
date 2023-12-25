import React from "react";
import { connect } from "react-redux";
import DialogModalCommonPage from "../../../commons/dialog-mui";

const ProductDetailHomePage = () => {
    return (
        <DialogModalCommonPage />
    )
}

export default connect()(ProductDetailHomePage);