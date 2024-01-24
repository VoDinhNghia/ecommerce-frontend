import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IpropProductDetail } from "../../../../interfaces/product.inteface";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import TextFieldCommon from "../../../commons/textfield-input";
import { formatDate, inputTypes } from "../../../../constants/constant";
import { productActions } from "../../../../store/actions";
import moment from "moment";
import {
  IregisterSchemaProductDetail,
  registerSchemaProductDetail,
} from "../../../../utils/product.util";

const ProductDetail = (props: IpropProductDetail) => {
  const {
    isShowModal,
    onCloseModal,
    type,
    productInfo,
    dispatch,
    fetchProducts,
  } = props;

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IregisterSchemaProductDetail>({
    resolver: zodResolver(registerSchemaProductDetail),
  });

  const handleAdd: SubmitHandler<IregisterSchemaProductDetail> = (values) => {
    dispatch({
      type: productActions.ADD_PRODUCT_DETAIL,
      payload: {
        productId: productInfo?.id,
        ...values,
      },
    });
    setTimeout(() => {
      fetchProducts();
      onCloseModal();
    }, 70);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const FormAddDetail = (
    <form onSubmit={handleSubmit(handleAdd)}>
      <p>DateOfManufacture: </p>
      <TextFieldCommon
        field="dateOfManufacture"
        type={inputTypes.DATE}
        register={register}
        errors={errors}
      />
      <p className="mt-2">country: </p>
      <TextFieldCommon field="country" register={register} errors={errors} />
      <p className="mt-2">color: </p>
      <TextFieldCommon field="color" register={register} errors={errors} />
      <p className="mt-2">inputPower: </p>
      <TextFieldCommon field="inputPower" register={register} errors={errors} />
      <p className="mt-2">mainboard: </p>
      <TextFieldCommon field="mainboard" register={register} errors={errors} />
      <p className="mt-2">memory: </p>
      <TextFieldCommon field="memory" register={register} errors={errors} />
      <p className="mt-2">size: </p>
      <TextFieldCommon field="size" register={register} errors={errors} />
      <p className="mt-2">warrantyExpiration: </p>
      <TextFieldCommon
        field="warrantyExpiration"
        register={register}
        errors={errors}
      />
      <Button variant="contained" className="mt-3 w-100" type="submit">
        Save
      </Button>{" "}
    </form>
  );

  const content = (
    <div>
      {productInfo?.detail ? (
        <div className="fs-6">
          <p>
            dateOfManufacture:{" "}
            {moment(productInfo?.detail?.dateOfManufacture).format(formatDate)}
          </p>
          <p>country: {productInfo?.detail?.country}</p>
          <p>color: {productInfo?.detail?.color}</p>
          <p>inputPower: {productInfo?.detail?.inputPower}</p>
          <p>mainboard: {productInfo?.detail?.mainboard}</p>
          <p>memory: {productInfo?.detail?.memory}</p>
          <p>size: {productInfo?.detail?.size}</p>
          <p>warrantyExpiration: {productInfo?.detail?.warrantyExpiration}</p>
        </div>
      ) : (
        <div>{FormAddDetail}</div>
      )}
    </div>
  );

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      onCloseModal={() => onCloseModal()}
      type={type}
      content={content}
      nameTitle={
        productInfo?.detail ? "View product detail" : "Add product detail"
      }
      size={productInfo?.detail ? "sm" : "xs"}
    />
  );
};

export default connect()(ProductDetail);
