import React, { useEffect } from "react"
// import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"

const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
}

// const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const redirectToCheckout = async event => {
  event.preventDefault()
  // const stripe = await stripePromise
  // const { error } = await stripe.redirectToCheckout({
  //   items: [{ sku: process.env.GATSBY_BUTTON_SKU_ID, quantity: 1 }],
  //   successUrl: `${window.location.origin}/page-2/`,
  //   cancelUrl: `${window.location.origin}/`,
  // })

  //   if (error) {
  //     console.warn("Error:", error)
  //   }
  //   stripe
  //     .redirectToCheckout({
  //       // Make the id field from the Checkout Session creation API response
  //       // available to this file, so you can provide it as parameter here
  //       // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
  //       sessionId: "{{CHECKOUT_SESSION_ID}}",
  //     })
  //     .then(function(result) {
  //       // If `redirectToCheckout` fails due to a browser or network
  //       // error, display the localized error message to your customer
  //       // using `result.error.message`.
  //     })
}

const Checkout = () => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        "https://gatsby-stripe-test.netlify.com//.netlify/functions/stripe",
        {
          stripeEmail: "homearanya@gmail.com",
          stripeAmt: 10000, //it expects the price in cents, as an integer
          // stripeToken: "tok_visa", //testing token, later we would use payload.data.token
          // stripeIdempotency: uuidv1(), //we use this library to create a unique id
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(result)
    }
    fetchData()
    // .then(res => {
    //   if (res.status === 200) {
    //     console.log("transaction successfull", res.status)
    //   } else {
    //     console.log("transaction unsuccessfull", res.status)
    //   }

    //   console.log(JSON.stringify(res, null, 2))
    // })
  }, [])

  return (
    <button style={buttonStyles} onClick={redirectToCheckout}>
      BUY MY BOOK
    </button>
  )
}

export default Checkout
