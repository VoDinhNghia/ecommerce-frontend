import React, { useEffect } from "react";
import DialogModalCommonPage from "../../../commons/dialog-mui";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { ImodalCategory } from "../../../../interfaces/category.interface";
import { inputTypes, modalTypes } from "../../../../constants/constant";
import { Button } from "@mui/material";
import TextFieldCommon from "../../../commons/textfield-input";

const ModalCategory = (props: ImodalCategory) => {
  const { isShowModal, onCloseModal, type, categoryInfo } = props;
  const {
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    reset(categoryInfo);
  }, [isSubmitSuccessful, categoryInfo]);

  const content = (
    <div>
      {type === modalTypes.ADD || type === modalTypes.UPDATE ? (
        <form>
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
    />
  );
};

export default connect()(ModalCategory);
