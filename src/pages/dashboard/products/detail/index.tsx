import React, { useEffect } from "react";
import { connect } from "react-redux";
import { IpropProductDetail } from "../../../../interfaces/product.inteface";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import {
  IregisterSchemaProductDetail,
  registerSchemaProductDetail,
} from "../../../../utils/product.util";
import TextFieldCommon from "../../../commons/textfield-input";
import { inputTypes } from "../../../../constants/constant";

const ProductDetail = (props: IpropProductDetail) => {
  const { isShowModal, onCloseModal, type, productInfo } = props;

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IregisterSchemaProductDetail>({
    resolver: zodResolver(registerSchemaProductDetail),
  });

  const handleAdd: SubmitHandler<IregisterSchemaProductDetail> = (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const content = (
    <div>
      {productInfo?.detail ? (
        <div>view detail</div>
      ) : (
        <div>
          <form onSubmit={handleSubmit(handleAdd)}>
            <p>DateOfManufacture: </p>
            <TextFieldCommon
              field="dateOfManufacture"
              type={inputTypes.DATE}
              register={register}
              errors={errors}
            />
            <p className="mt-2">country: </p>
            <TextFieldCommon
              field="country"
              register={register}
              errors={errors}
            />
            <p className="mt-2">color: </p>
            <TextFieldCommon
              field="color"
              register={register}
              errors={errors}
            />
            <p className="mt-2">inputPower: </p>
            <TextFieldCommon
              field="inputPower"
              register={register}
              errors={errors}
            />
            <p className="mt-2">mainboard: </p>
            <TextFieldCommon
              field="mainboard"
              register={register}
              errors={errors}
            />
            <p className="mt-2">memory: </p>
            <TextFieldCommon
              field="memory"
              register={register}
              errors={errors}
            />
            <p className="mt-2">size: </p>
            <TextFieldCommon field="size" register={register} errors={errors} />
            <p className="mt-2">warrantyExpiration: </p>
            <TextFieldCommon
              field="warrantyExpiration"
              register={register}
              errors={errors}
            />
            <Button variant="contained" className="mt-3 w-100">
              Save
            </Button>{" "}
          </form>
        </div>
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
