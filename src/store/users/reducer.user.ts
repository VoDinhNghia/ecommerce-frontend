import { IactionRedux } from "../../interfaces/common.interface";
import { userActions } from "../actions";

const initState = {
  listUsers: [],
  totalUser: 0,
};

export const UserReducer = (state = initState, action: IactionRedux) => {
  switch (action.type) {
    case userActions.GET_LIST_USER:
      return {
        ...state,
        loading: true,
      };
    case userActions.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        listUsers: action?.payload?.results,
        totalUser: action?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};
