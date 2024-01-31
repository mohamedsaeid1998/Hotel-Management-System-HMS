import React from 'react'
import './CheckoutForm.module.scss'
import { Box, Button } from '@mui/material'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

const cardElement = elements.getElement(CardElement)
const {token,error} = await stripe.createToken(cardElement)

    if (error) {
      console.log(error)
    } else {

      const tokenId=token?.id;
      console.log(tokenId);
      
    }
  };


  return <>
<Box component={"form"} onClick={handleSubmit}>
<CardElement className='cardElement'/>
<Button variant='contained' disabled={!stripe} type='submit'>Pay</Button>
</Box>
  </>
}

export default CheckoutForm

