import React, { useState } from 'react'
import './CheckoutForm.module.scss'
import { Box, Button } from '@mui/material'
import { useStripe, useElements, CardElement, CardCvcElement, CardExpiryElement, CardNumberElement, AuBankAccountElement, AddressElement, ExpressCheckoutElement, IbanElement, FpxBankElement } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { paymentByVisa } from '@/Redux/Features/Portal/Payment/PaymentSlice';
import { LoadingButton } from '@mui/lab';
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { id } = useParams()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  
  //! ************************ Payment function  *************************
  const handlePayment = async (tokenId: any) => {

    try {
      setLoading(true)
      // @ts-ignore
      const element = await dispatch(paymentByVisa({ tokenId, id }));
      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } finally {
      setLoading(false)
    }
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement)
    const { token, error } = await stripe.createToken(cardElement)

    if (error) {
      toast.error(error?.message, {
        autoClose: 2000,
        theme: "colored",
      })
    } else {
      const tokenId = token?.id;
      handlePayment(tokenId)
    }
  };


  return <>
    <Box component={"form"} className="paymentForm" onSubmit={handleSubmit}>
      <AddressElement className='AddressElement' options={{ mode: 'billing' }}	></AddressElement>
      <CardElement className='cardElement' />
      {loading ? (
        <LoadingButton
          sx={{ width: "100%", padding: "10px", margin: "20px 0" }}
          className="loadingButton"
          loading
          variant="outlined"
        >
          Login
        </LoadingButton>
      ) : (
        <Button variant='contained' disabled={!stripe} type='submit'>Pay</Button>
      )}    </Box>
  </>
}

export default CheckoutForm

