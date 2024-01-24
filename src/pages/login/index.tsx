/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { login } from "../../services/auth.service";
import { inputTypes, routes } from "../../constants/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MenuHome from "../menu-home";
import FooterPage from "../commons/footer";
import { getCart } from "../../services/cart.service";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import TextFieldCommon from "../commons/textfield-input";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import {
  registerSchemaLoginForm,
  IregisterInputLoginForm,
} from "../../utils/login.util";

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IregisterInputLoginForm>({
    resolver: zodResolver(registerSchemaLoginForm),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandlerLogin: SubmitHandler<IregisterInputLoginForm> = async (
    values
  ): Promise<void> => {
    const payload = {
      email: values?.email,
      password: values?.password,
    };
    const res = await login(payload);
    if (res?.statusCode === 200) {
      NotificationManager.success(res?.message, "Login", 4000);
      setTimeout(() => {
        navigate(routes.dashboard);
      }, 200);
    } else {
      NotificationManager.error(res?.message, "Login", 4000);
    }
  };

  return (
    <div>
      <MenuHome numberCart={getCart()?.length || 0} />
      <form onSubmit={handleSubmit(onSubmitHandlerLogin)}>
        <MDBContainer
          fluid
          className="p-4 background-radial-gradient overflow-hidden"
        >
          <MDBRow>
            <MDBCol
              md="6"
              className="text-center text-md-start d-flex flex-column justify-content-center"
            >
              <h1 className="my-5 display-3 fw-bold ls-tight px-3 TextColor">
                The best offer <br />
                <span className="TextColor">for your store</span>
              </h1>
              <p className="TextColor">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
            </MDBCol>
            <MDBCol md="6" className="position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>
              <MDBCard className="my-5 bg-glass">
                <MDBCardBody className="p-5">
                  <p className="text-center">
                    <img
                      src="/images/icon-login.jpg"
                      alt=""
                      className="IconLoginPage"
                    />
                  </p>
                  <br />
                  <br />
                  <TextFieldCommon
                    field="email"
                    type={inputTypes.EMAIL}
                    errors={errors}
                    register={register}
                    placeholder={t("EmailLogin")}
                  />
                  <br />
                  <br />
                  <TextFieldCommon
                    field="password"
                    type={inputTypes.PASSWORD}
                    errors={errors}
                    register={register}
                    placeholder={t("PasswordLogin")}
                  />
                  <Button className="w-100 mt-3" type="submit">
                    {t("LoginTitle")}
                  </Button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
      <FooterPage />
    </div>
  );
};

export default withTranslation()(LoginPage);
