require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = (event, context, callback) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: "This was not a POST request!",
    }
  }

  // some error checking:
  if (event.httpMethod !== "POST" || !event.body) {
    callback(null, {
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: "bad-payload" }),
    })
  }
  // Parse the body contents into an object.
  const data = JSON.parse(event.body)

  // Make sure we have all required data. Otherwise, escape.
  if (!data.amount) {
    console.error("Required information is missing.")

    callback(null, {
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: "missing-information" }),
    })

    return
  }

  console.log("about to create session")
  stripe.checkout.sessions.create(
    {
      payment_method_types: ["card"],
      line_items: [
        {
          name: "T-shirt",
          description: "Comfortable cotton t-shirt",
          images: ["https://gatsby-stripe-test.netlify.com//t-shirt.png"],
          amount: data.amount,
          currency: "eur",
          quantity: 1,
        },
      ],
      success_url:
        "https://gatsby-stripe-test.netlify.com//success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://gatsby-stripe-test.netlify.com//cancel",
    },

    function(err, session) {
      // asynchronously called
      if (err !== null) {
        console.log(err)
        callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify({ status: "session-create-failed" }),
        })
      }
      // woohoo! it worked, send the session id back to the browser:
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: "session-created",
          sessionId: session.id,
        }),
      })
    }
  )
}
