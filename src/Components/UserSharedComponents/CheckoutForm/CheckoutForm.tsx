import { paymentByVisa } from "@/Redux/Features/Portal/Payment/PaymentSlice";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Skeleton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./CheckoutForm.module.scss";
import { creditCard, paymentDone } from "@/Assets/Images";
import { useTranslation } from "react-i18next";
const CheckoutForm = () => {
  const { t, i18n } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //! ************************ Payment function  *************************
  const handlePayment = async (tokenId: any) => {
    try {
      setLoading(true);
      // @ts-ignore
      const element = await dispatch(paymentByVisa({ tokenId, id }));
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
      setActiveStep((currentStep) => currentStep + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      toast.error(error?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      const tokenId = token?.id;
      handlePayment(tokenId);
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <>
      <Box component={"main"}>
        <Box className="userContainer">
          <Box className="Stepper">
            <Stepper activeStep={activeStep}>
              <Step className="circle">
                <StepLabel>{t("MakePayment")} </StepLabel>
              </Step>
              <Step>
                <StepLabel> {t("CompleteTheApplication")} </StepLabel>
              </Step>
            </Stepper>
          </Box>

          <Box>
            {activeStep === 0 ? (
              <>
                <Box className="headerPay">
                  <Typography variant="h3" className="headerTitle">
                    {t("Payment")}
                  </Typography>
                  <Typography className="content">
                    {t("PaymentDesc")}
                  </Typography>
                </Box>

                <Box className="paymentCon">
                  <Box className="leftCon">
                    {!creditCard ? (
                      <Skeleton
                        variant="rectangular"
                        width={420}
                        height={460}
                        animation="wave"
                      />
                    ) : (
                      <img src={creditCard} alt="creditCardImage" />
                    )}
                  </Box>

                  <Box
                    component={"form"}
                    className="paymentForm"
                    onSubmit={handleSubmit}
                  >
                    <AddressElement
                      className="AddressElement"
                      options={{ mode: "billing" }}
                    ></AddressElement>
                    <CardElement className="cardElement" />
                    {loading ? (
                      <LoadingButton
                        sx={{
                          width: "100%",
                          padding: "20px",
                          margin: "20px 0",
                        }}
                        className="loadingButton"
                        loading
                        variant="outlined"
                      ></LoadingButton>
                    ) : (
                      <>
                        <Box className="paymentBtnCon">
                          <Button
                            variant="contained"
                            className="paymentBtn"
                            disabled={!stripe}
                            type="submit"
                          >
                            {t("Pay")}
                          </Button>
                          <Button
                            variant="contained"
                            className="paymentBtn"
                            onClick={() => navigate("/")}
                            type="submit"
                          >
                            {t("Cancel")}
                          </Button>
                        </Box>
                      </>
                    )}{" "}
                  </Box>
                </Box>
              </>
            ) : (
              <>
                <Box className="headerPay">
                  <Typography variant="h3" className="headerTitle">
                    Yay! Completed
                  </Typography>
                  <img src={paymentDone} alt="" />
                  <Typography className="content">
                    We will inform you via email later once the transaction has
                    been accepted
                  </Typography>
                  <Button className="backBtn" onClick={() => handleNavigate()}>
                    Back To Home
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutForm;
