import BillingForm from "@/app/components/dashboard/billing-form";
import { DashboardHeader } from "@/app/components/dashboard/header";
import { DashboardShell } from "@/app/components/dashboard/shell";
import { authOptions } from "@/app/lib/auth";
import { getCurrentUser } from "@/app/lib/session";
import { stripe } from "@/app/lib/stripe";
import { getUserSubscriptionPlan } from "@/app/lib/subscription";
import { redirect } from "next/navigation";

interface Props {}

const page = async (props: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }
  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
        <div className="p-4 border rounded-md">
          <h1 className="pb-6 font-medium text-lg">Note</h1>
          <p className="space-y-4 pb-4 text-sm">
            Taxonomy app is a demo app using a Stripe test environment.{" "}
            <strong>You can test the upgrade and won&apos;t be charged.</strong>
          </p>
          <p className="space-y-4 pb-4 text-sm">
            You can find a list of test card numbers on the{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </p>
        </div>
      </div>
    </DashboardShell>
  );
};

export default page;
