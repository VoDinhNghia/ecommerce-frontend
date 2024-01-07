import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "./index.css";
import { useForm, SubmitHandler } from "react-hook-form";
import MenuHome from "../menu-home";
import FooterPage from "../commons/footer";
import { getCart } from "../../services/cart.service";
import { withTranslation } from "react-i18next";
import { t } from "i18next";
import TextFieldCommon from "../commons/textfield-input";
import { inputTypes } from "../../constants/constant";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { IregisterSchemaSignUp, registerSchemaSignUp } from "../../utils/signUp.util";

const SignUpPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IregisterSchemaSignUp>({
    resolver: zodResolver(registerSchemaSignUp),
  });

  const handleAdd: SubmitHandler<IregisterSchemaSignUp> = (values) => {
    console.log(values);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <div>
      <MenuHome numberCart={getCart()?.length || 0} />
      <form onSubmit={handleSubmit(handleAdd)}>
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
                  <MDBRow>
                    <MDBCol col="6">
                      <TextFieldCommon
                        field="firstName"
                        errors={errors}
                        register={register}
                        placeholder={t("firstNameSignUp")}
                      />
                    </MDBCol>

                    <MDBCol col="6">
                      <TextFieldCommon
                        field="lastName"
                        errors={errors}
                        register={register}
                        placeholder={t("lastNameSignUp")}
                      />
                    </MDBCol>
                  </MDBRow>
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
                  <br />
                  <br />
                  <TextFieldCommon
                    field="address"
                    errors={errors}
                    register={register}
                    placeholder={t("Address")}
                  />
                  <br />
                  <br />
                  <TextFieldCommon
                    field="mobile"
                    errors={errors}
                    register={register}
                    placeholder={t("mobileSignUp")}
                  />

                  <Button className="w-100 mt-3" type="submit">
                    {t("titleSignUp")}
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

export default withTranslation()(SignUpPage);
