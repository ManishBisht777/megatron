import { proPlan } from "@/app/config/subscription";
import { getCurrentUser } from "@/app/lib/session";
import { stripe } from "@/app/lib/stripe";
import { getUserSubscriptionPlan } from "@/app/lib/subscription";
import { absoluteUrl } from "@/app/lib/utils";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found.");
    }

    const billingUrl = absoluteUrl("/dashboard/billing");
    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      return res.json({ url: stripeSession.url });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email!,
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    return NextResponse.error();
  }
}
