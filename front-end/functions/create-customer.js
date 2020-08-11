const fetch = require("node-fetch")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const apiURL = process.env.GATSBY_API_URL || "http://localhost:1337"

exports.handler = async event => {
  const { username, email, password } = JSON.parse(event.body)

  const customer = await stripe.customers.create({
    email: email,
  })

  await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: "price_1HDGyvE8j8J0kTAxg7ozCV1h" }],
  })

  const stripeId = customer.id

  const response = await fetch(`${apiURL}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      stripeId,
    }),
  })
    .then(res => res.json())
    .catch(err => console.error(err))

  console.log("response =>", JSON.stringify(response))

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
