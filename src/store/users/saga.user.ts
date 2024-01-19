import { takeLatest } from "redux-saga/effects";
import { userActions } from "../actions";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";
import {
  getUserList,
  updateProfile,
  updateUser,
  addUser,
  deleteUser,
} from "../../services/user.service";

function* fetchListUsers(params: IparamSaga) {
  yield fetchListSagaCommon(
    getUserList,
    userActions.GET_LIST_USER_SUCCESS,
    "Get list users",
    params
  );
}

function* updateUserInfo(params: IparamSaga) {
  yield updateSagaCommon(updateUser, params, "Update user info");
}

function* updateUserProfile(params: IparamSaga) {
  yield updateSagaCommon(updateProfile, params, "Update user profile");
}

function* addNewUser(params: IparamSaga) {
  yield addSagaCommon(addUser, params, "Add user");
}

function* removeUser(params: IparamSaga) {
  yield removeSagaCommon(deleteUser, params, "Delete user");
}

export default function* UserSaga() {
  yield takeLatest<ItakeLatestSaga>(userActions.GET_LIST_USER, fetchListUsers);
  yield takeLatest<ItakeLatestSaga>(
    userActions.UPDATE_USER_INFO,
    updateUserInfo
  );
  yield takeLatest<ItakeLatestSaga>(
    userActions.UPDATE_USER_PROFILE,
    updateUserProfile
  );
  yield takeLatest<ItakeLatestSaga>(userActions.ADD_USER, addNewUser);
  yield takeLatest<ItakeLatestSaga>(userActions.DELETE_USER, removeUser);
}
