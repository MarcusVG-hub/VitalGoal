const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getRawBody = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, stripe-signature");

  if (req.method === "OPTIONS") return res.status(200).end();

  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).json({ error: "Webhook Error: " + err.message });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id;

    console.log("Payment received:", customerEmail, priceId);

    if (customerEmail && priceId) {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_URL + "/api/send-ebook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerEmail, priceId }),
        });
        const data = await response.json();
        console.log("Ebook sent:", data);
      } catch (err) {
        console.error("Error sending ebook:", err);
      }
    }
  }

  return res.status(200).json({ received: true });
};
