import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
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

const stripePromise = loadStripe("pk_test_9BnabfLcqNxYxfbNAjLpzRKF00PDb2TW0m")

const redirectToCheckout = async (event, sessionId) => {
  event.preventDefault()
  const stripe = await stripePromise
  const { error } = await stripe.redirectToCheckout({
    // Make the id field from the Checkout Session creation API response
    // available to this file, so you can provide it as parameter here
    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    sessionId: sessionId,
  })

  if (error) {
    console.warn("Error:", error)
  }
}

const Checkout = () => {
  const [sessionId, setSessionId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        // "https://gatsby-stripe-test.netlify.com//.netlify/functions/stripe",
        "https://dzzofzdmy7.execute-api.us-east-1.amazonaws.com/dev/stripe",
        {
          amount: 10000, //it expects the price in cents, as an integer
          // stripeToken: "tok_visa", //testing token, later we would use payload.data.token
          // stripeIdempotency: uuidv1(), //we use this library to create a unique id
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      setSessionId(result.data.sessionId)
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
    <button
      style={buttonStyles}
      onClick={event => redirectToCheckout(event, sessionId)}
    >
      BUY MY BOOK
    </button>
  )
}

export default Checkout
