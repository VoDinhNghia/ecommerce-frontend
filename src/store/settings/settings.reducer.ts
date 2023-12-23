import { IactionRedux } from "../../interfaces/common.interface";
import { settingActions } from "../actions";

const initState = {
  listSlideImgAdv: [],
  totalSlideImgAdv: 0,
};

const SlideImgAdvReducer = (state = initState, actions: IactionRedux) => {
  switch (actions?.type) {
    case settingActions.GET_SLIDE_IMAGE:
      return {
        ...state,
        loading: true,
      };
    case settingActions.GET_SLIDE_IMAGE_SUCCESS:
      return {
        ...state,
        listSlideImgAdv: actions?.payload?.results,
        totalSlideImgAdv: actions?.payload?.total,
        loading: false,
      };
    default:
      return state;
  }
};

export default SlideImgAdvReducer;
