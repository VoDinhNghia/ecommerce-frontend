import { IactionRedux } from "../../interfaces/common.interface";
import { categoryActions } from "../actions";

const initState = {
  listCategories: [],
  totalCategory: 0,
};

export const CategoryReducer = (state = initState, actions: IactionRedux) => {
  switch (actions.type) {
    case categoryActions.GET_LIST_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case categoryActions.GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        listCategories: actions?.payload?.results,
        totalCategory: actions?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};