import React, { useEffect } from "react";
import { IpropSlideImgAdv } from "../../../interfaces/home.interface";
import { connect } from "react-redux";
import { IstateRedux } from "../../../interfaces/common.interface";
import { settingActions } from "../../../store/actions";
import { Carousel } from "react-bootstrap";
import { API_URL } from "../../../constants/constant";
import { FcPrevious, FcNext } from "react-icons/fc";

const SlideImgAdvHomePage = (props: IpropSlideImgAdv) => {
  const { listSlideImgAdv = [], dispatch } = props;
  const fetchSlideImg = () => {
    dispatch({
      type: settingActions.GET_SLIDE_IMAGE,
      payload: {
        isActive: true,
      },
    });
  };

  useEffect(() => {
    fetchSlideImg();
  }, []);

  return (
    <div>
      {listSlideImgAdv?.length > 0 ? (
        <Carousel
          prevIcon={<FcPrevious className="IconSlidePrevHomePage" />}
          nextIcon={<FcNext className="IconSlidePrevHomePage" />}
        >
          {listSlideImgAdv?.map((imgAdv) => {
            return (
              <Carousel.Item key={imgAdv?.id}>
                <img
                  src={`${API_URL}/slide-images/${imgAdv?.url}`}
                  alt=""
                  width="100%"
                  height={300}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : null}
    </div>
  );
};

const mapStateToProp = (state: IstateRedux) => {
  return {
    listSlideImgAdv: state.SlideImgAdvReducer.listSlideImgAdv,
  };
};

export default connect(mapStateToProp)(SlideImgAdvHomePage);
