"use client";

import { cn, formatDate } from "@/app/lib/utils";
import { UserSubscriptionPlan } from "@/app/types";
import React, { FormEvent } from "react";
import { buttonVariants } from "../ui/button";
import { Icons } from "../ui/icons";

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean;
  };
}

const BillingForm = ({ subscriptionPlan, className }: BillingFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(!isLoading);

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe");

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json();
    if (session) {
      window.location.href = session.url;
    }
  }

  return (
    <form className="border rounded-md" onSubmit={(e) => onSubmit(e)}>
      <div className="p-4">
        <h3 className="text-slate-800 text-lg font-medium">Plan</h3>
        <p className="text-slate-600">You are currently on the Free plan.</p>
      </div>
      <div className="p-4">description</div>
      <div className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0 p-3 border-t bg-slate-100">
        <button
          type="submit"
          className={cn(buttonVariants())}
          disabled={isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to PRO"}
        </button>
        {subscriptionPlan.isPro ? (
          <p className="rounded-full text-xs font-medium">
            {subscriptionPlan.isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default BillingForm;
