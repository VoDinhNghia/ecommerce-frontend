import { takeLatest } from "redux-saga/effects";
import { settingActions } from "../actions";
import {
  createSlideImg,
  deleteSlideImg,
  getAllSlideImg,
  updateSlideImg,
} from "../../services/settings.service";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";

function* addSlideImgAdv(params: IparamSaga) {
  yield addSagaCommon(createSlideImg, params, "Add slide image");
}

function* fetchSlideImageAdv(params: IparamSaga) {
  yield fetchListSagaCommon(
    getAllSlideImg,
    settingActions.GET_SLIDE_IMAGE_SUCCESS,
    "Get list slide image",
    params
  );
}

function* editSlideImage(params: IparamSaga) {
  yield updateSagaCommon(updateSlideImg, params, "Update slide image");
}

function* deleteSlideImageAdv(params: IparamSaga) {
  yield removeSagaCommon(deleteSlideImg, params, "Delete slide image");
}

function* SlideImageAdvSaga() {
  yield takeLatest<ItakeLatestSaga>(
    settingActions.ADD_SLIDE_IMAGE,
    addSlideImgAdv
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.DELETE_SLIDE_IMAGE,
    deleteSlideImageAdv
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.GET_SLIDE_IMAGE,
    fetchSlideImageAdv
  );
  yield takeLatest<ItakeLatestSaga>(
    settingActions.UPDATE_SLIDE_IMAGE,
    editSlideImage
  );
}

export default SlideImageAdvSaga;
