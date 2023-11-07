import React, { useEffect } from "react";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { connect } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImodalCategory } from "../../../../interfaces/category.interface";
import { inputTypes, modalTypes } from "../../../../constants/constant";
import { Button } from "@mui/material";
import TextFieldCommon from "../../../commons/textfield-input";
import {
  IregisterCategoryInput,
  registerSchemaCategory,
} from "../../../../utils/category.util";
import { categoryActions } from "../../../../store/actions";

const ModalCategory = (props: ImodalCategory) => {
  const {
    isShowModal,
    onCloseModal,
    type,
    categoryInfo,
    dispatch,
    fetchCategories,
  } = props;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IregisterCategoryInput>({
    resolver: zodResolver(registerSchemaCategory),
  });

  const addHandle: SubmitHandler<IregisterCategoryInput> = (values) => {
    dispatch({
      type: categoryActions.ADD_CATEGORY,
      payload: {
        name: values?.name,
        description: values?.description,
      },
    });
    fetchAndCloseModal();
  };

  const updateHandle: SubmitHandler<IregisterCategoryInput> = (values) => {
    dispatch({
      type: categoryActions.UPDATE_CATEGORY,
      id: categoryInfo?.id,
      payload: {
        name: values?.name,
        description: values?.description,
      },
    });
    fetchAndCloseModal();
  };

  const onDelete = () => {
    dispatch({
      type: categoryActions.DELETE_CATEGORY,
      id: categoryInfo?.id,
    });
    fetchAndCloseModal();
  };

  const fetchAndCloseModal = () => {
    setTimeout(() => {
      fetchCategories();
      onCloseModal();
    }, 100);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset(categoryInfo);
  }, [isSubmitSuccessful, categoryInfo]);

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form
          onSubmit={
            type === modalTypes.ADD
              ? handleSubmit(addHandle)
              : handleSubmit(updateHandle)
          }
        >
          <p>Name: </p>
          <TextFieldCommon
            field="name"
            register={register}
            errors={errors}
            defaultValue={categoryInfo?.name || ""}
          />
          <p className="mt-2">Description: </p>
          <TextFieldCommon
            field="description"
            type={inputTypes.TEXT_AREA}
            rows={6}
            register={register}
            errors={errors}
            defaultValue={categoryInfo?.description || ""}
          />
          <Button variant="contained" className="w-100 mt-3" type="submit">
            Save
          </Button>
        </form>
      ) : (
        ""
      )}
      {type === modalTypes.DELETE ? (
        <span>
          Are you want to delete this <b>{categoryInfo?.name}</b>?
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
      nameTitle="category"
      onDelete={() => onDelete()}
    />
  );
};

export default connect()(ModalCategory);
