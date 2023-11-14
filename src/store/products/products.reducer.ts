import { IactionRedux } from "../../interfaces/common.interface";
import { productActions } from "../actions";

const initState = {
  listProducts: [],
  totalProduct: 0,
};

const ProductReducer = (state = initState, action: IactionRedux) => {
  switch (action?.type) {
    case productActions.GET_LIST_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case productActions.GET_LIST_PRODUCT_SUCCESS:
      return {
        ...state,
        listProducts: action?.payload?.results,
        totalProduct: action?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};

export default ProductReducer;
