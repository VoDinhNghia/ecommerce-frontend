import React, { useEffect, useState } from "react";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { connect } from "react-redux";
import {
  IproductDiscount,
  IpropProductDiscount,
} from "../../../../interfaces/product.inteface";
import { Tab, Tabs } from "react-bootstrap";
import {
  formatDate,
  inputTypes,
  productDiscountTab,
} from "../../../../constants/constant";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import HeaderTableCommon from "../../../commons/header-table";
import {
  IregisterSchemaProductDiscount,
  headerDiscountTable,
  registerSchemaProductDiscount,
} from "../../../../utils/product.util";
import moment from "moment";
import ActionTableCommon from "../../../commons/actions-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import TextFieldCommon from "../../../commons/textfield-input";
import { productActions } from "../../../../store/actions";

const ProductDiscount = (props: IpropProductDiscount) => {
  const {
    isShowModal,
    onCloseModal,
    type,
    productInfo = {},
    dispatch,
    fetchProducts,
  } = props;
  const [state, setState] = useState({
    isShowModalUpdate: false,
    isShowModalDelete: false,
    rowData: {},
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IregisterSchemaProductDiscount>({
    resolver: zodResolver(registerSchemaProductDiscount),
  });

  const handleAdd: SubmitHandler<IregisterSchemaProductDiscount> = (values) => {
    dispatch({
      type: productActions.ADD_PRODUCT_DISCOUNT,
      payload: {
        ...values,
        productId: productInfo?.id,
      },
    });
    setTimeout(() => {
      fetchProducts();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const content = (
    <Tabs defaultActiveKey={productDiscountTab.table.key} className="fs-6">
      <Tab
        eventKey={productDiscountTab.table.key}
        title={productDiscountTab.table.title}
      >
        <TableContainer className="mt-2">
          <Table stickyHeader aria-label="product discount table">
            <HeaderTableCommon headerList={headerDiscountTable} />
            <TableBody>
              {productInfo?.discounts?.map(
                (dis: IproductDiscount, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={dis?.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{dis?.discount}%</TableCell>
                      <TableCell>
                        {moment(dis?.startDate).format(formatDate)}
                      </TableCell>
                      <TableCell>
                        {moment(dis?.endDate).format(formatDate)}
                      </TableCell>
                      <TableCell>
                        <ActionTableCommon
                          setState={setState}
                          state={state}
                          rowData={dis}
                          disableBtnUpdate={true}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Tab>
      <Tab
        eventKey={productDiscountTab.addDiscount.key}
        title={productDiscountTab.addDiscount.title}
      >
        <form onSubmit={handleSubmit(handleAdd)}>
          <p>Discount: </p>
          <TextFieldCommon
            field="discount"
            type={inputTypes.NUMBER}
            errors={errors}
            register={register}
          />
          <p className="mt-2">startDate: </p>
          <TextFieldCommon
            field="startDate"
            type={inputTypes.DATE}
            errors={errors}
            register={register}
          />
          <p className="mt-2">endDate: </p>
          <TextFieldCommon
            field="endDate"
            type={inputTypes.DATE}
            errors={errors}
            register={register}
          />
          <Button variant="contained" className="mt-3 w-100" type="submit">
            Save
          </Button>
        </form>
      </Tab>
    </Tabs>
  );
  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      nameTitle="Product Discount"
      content={content}
      size={"sm"}
    />
  );
};

export default connect()(ProductDiscount);
