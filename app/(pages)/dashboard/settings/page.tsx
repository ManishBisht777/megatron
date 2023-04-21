import { DashboardHeader } from "@/app/components/dashboard/header";
import { DashboardShell } from "@/app/components/dashboard/shell";
import UserNameForm from "@/app/components/dashboard/user-name-form";
import { authOptions } from "@/app/lib/auth";
import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};
const page = async (props: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  return (
    <DashboardShell className="py-2">
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      {user?.name ? (
        <UserNameForm user={{ id: user.id, name: user.name }} />
      ) : null}
    </DashboardShell>
  );
};

export default page;
