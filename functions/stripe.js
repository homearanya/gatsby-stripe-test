require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "Content-Type",
// }

exports.handler = async (event, context) => {
  console.log("stripe lambda function: ", event.body)
  //   if (!event.body || event.httpMethod !== "POST") {
  //     return {
  //       statusCode: 400,
  //       headers,
  //       body: JSON.stringify({ status: "invalid http method" }),
  //     }
  //   }

  //   const data = JSONj.parse(event.body)

  //   if (!data.stripeToken || !data.stripeAmt || data.stripeIdempotency) {
  //     console.log("Required information missing")

  //     return {
  //       statusCode: 400,
  //       headers,
  //       body: JSON.stringify({ status: "Required information missing" }),
  //     }
  //   }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          name: "T-shirt",
          description: "Comfortable cotton t-shirt",
          images: ["https://gatsby-stripe-test.netlify.com//t-shirt.png"],
          amount: 500,
          currency: "eur",
          quantity: 1,
        },
      ],
      success_url:
        "https://gatsby-stripe-test.netlify.com//success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://gatsby-stripe-test.netlify.com//cancel",
    })
  } catch (error) {}

  //   // stripe charge processing starts here
  //   try {
  //     await stripe.customers
  //       .create({ email: data.stripeEmail, source: data.stripeToken })
  //       .then(customer => {
  //         console.log(
  //           `starting the charges, amt: ${data.stripeAmt}, email: ${data.stripeEmail}`
  //         )

  //         return stripe.charges.create(
  //           {
  //             currency: "EUR",
  //             amount: data.stripeAmt,
  //             receipt_email: data.stripeEmail,
  //             customer: customer.id,
  //             description: "test charge",
  //           },
  //           {
  //             idempotency_key: data.stripeIdempotency,
  //           }
  //         )
  //       })
  //       .then(result => console.log("charge created: ", result))
  //   } catch (error) {}
}
