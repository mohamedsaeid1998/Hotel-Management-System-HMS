import React from 'react'
import './CheckoutForm.module.scss'
import { Box, Button } from '@mui/material'
import { useStripe, useElements, CardElement, CardCvcElement, CardExpiryElement, CardNumberElement, AuBankAccountElement, AddressElement, ExpressCheckoutElement, IbanElement, FpxBankElement } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { paymentByVisa } from '@/Redux/Features/Portal/Payment/PaymentSlice';
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { id } = useParams()
  const dispatch = useDispatch();
  //! ************************ Payment function  *************************
  console.log(id);

  const handlePayment = async (tokenId: any) => {
    console.log(tokenId, id);

    try {
      // @ts-ignore
      const element = await dispatch(paymentByVisa({ tokenId, id }));
      console.log(element)

      // @ts-ignore
      toast.success(element?.payload?.message, {
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      // toast.error("Error fetching data:", error);
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
      console.log(tokenId);
      handlePayment(tokenId)
    }
  };


  return <>
    <Box component={"form"} className="paymentForm" onClick={handleSubmit}>
      <AddressElement className='AddressElement' options={{ mode: 'billing' }}	></AddressElement>
      <CardElement className='cardElement' />
      <Button variant='contained' disabled={!stripe} type='submit'>Pay</Button>
    </Box>
  </>
}

export default CheckoutForm

