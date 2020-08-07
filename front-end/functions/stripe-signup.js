const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async event => {
  const { email } = JSON.parse(event.body)

  const customer = await stripe.customers.create({
    email: email,
  })

  await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: "price_1HDGyvE8j8J0kTAxg7ozCV1h" }],
  })

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      customerId: customer.id,
    }),
  }
}
