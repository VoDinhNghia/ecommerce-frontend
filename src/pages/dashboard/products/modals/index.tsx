import React, { useEffect } from "react";
import { connect } from "react-redux";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { ImodalProductPage } from "../../../../interfaces/product.inteface";
import { inputTypes, modalTypes } from "../../../../constants/constant";
import { Button } from "@mui/material";
import { categoryActions, productActions } from "../../../../store/actions";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IregisterSchemaProduct,
  registerSchemaProduct,
} from "../../../../utils/product.util";
import { IstateRedux } from "../../../../interfaces/common.interface";
import { handleCategoryOptions } from "../../../../utils/util";
import TextFieldCommon from "../../../commons/textfield-input";
import SelectReactCommon from "../../../commons/select-react";

const ModalProductPage = (props: ImodalProductPage) => {
  const {
    isShowModal,
    type,
    onCloseModal,
    productInfo = {},
    dispatch,
    listCategories = [],
    fetchProducts,
  } = props;
  const categoryOptions = handleCategoryOptions(listCategories);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<IregisterSchemaProduct>({
    resolver: zodResolver(registerSchemaProduct),
  });

  const handleAdd: SubmitHandler<IregisterSchemaProduct> = (values) => {
    dispatch({
      type: productActions.ADD_PRODUCT,
      payload: values,
    });
    fetchAndCloseModal();
  };

  const handleUpdate: SubmitHandler<IregisterSchemaProduct> = (values) => {
    dispatch({
      type: productActions.UPDATE_PRODUCT,
      id: productInfo?.id,
      payload: values,
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: productActions.DELETE_PRODUCT,
      id: productInfo?.id,
    });
  };

  const fetchCategories = () => {
    dispatch({
      type: categoryActions.GET_LIST_CATEGORY,
    });
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchProducts();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset({
      ...productInfo,
      categoryId: productInfo?.category?.id,
    });
    fetchCategories();
  }, [isSubmitSuccessful, productInfo]);

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form
          onSubmit={
            type === modalTypes.ADD
              ? handleSubmit(handleAdd)
              : handleSubmit(handleUpdate)
          }
        >
          <p>Category Id: </p>
          <SelectReactCommon
            field="categoryId"
            errors={errors}
            control={control}
            options={categoryOptions}
            defaultValue={
              categoryOptions.find(
                (item) => item.value === productInfo?.category?.id
              ) || ""
            }
          />
          <p className="mt-2">Name: </p>
          <TextFieldCommon
            field="name"
            errors={errors}
            register={register}
            defaultValue={productInfo?.name || ""}
          />
          <p className="mt-2">Price: </p>
          <TextFieldCommon
            field="price"
            errors={errors}
            register={register}
            type={inputTypes.NUMBER}
            defaultValue={productInfo?.price || ""}
          />
          <p className="mt-2">Quantity: </p>
          <TextFieldCommon
            field="quantity"
            errors={errors}
            register={register}
            type={inputTypes.NUMBER}
            defaultValue={productInfo?.quantity || ""}
          />
          <p className="mt-2">Description: </p>
          <TextFieldCommon
            field="description"
            type={inputTypes.TEXT_AREA}
            errors={errors}
            register={register}
            defaultValue={productInfo?.description || ""}
          />
          <Button variant="contained" className="mt-3 w-100" type="submit">
            Save
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.DELETE ? (
        <span>
          Are you want to delete this <b>{productInfo?.name}</b>?
        </span>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <DialogModalCommonPage
      isShowModal={isShowModal}
      type={type}
      onCloseModal={() => onCloseModal()}
      content={content}
      onDelete={() => onDelete()}
      nameTitle="product"
    />
  );
};

const mapStateToProp = (state: IstateRedux) => {
  return {
    listCategories: state.CategoryReducer.listCategories,
  };
};

export default connect(mapStateToProp)(ModalProductPage);
