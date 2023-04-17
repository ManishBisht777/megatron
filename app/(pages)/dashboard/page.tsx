import { DashboardHeader } from "@/app/components/dashboard/header";
import { DashboardShell } from "@/app/components/dashboard/shell";
import { buttonVariants } from "@/app/components/ui/button";
import { Icons } from "@/app/components/ui/icons";
import { cn } from "@/app/lib/utils";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        {/* <PostCreateButton /> */}
        <button className={cn(buttonVariants(), "flex gap-1 items-center")}>
          <Icons.add className="w-4" />
          Add Post
        </button>
      </DashboardHeader>
      <div className="flex min-h-[350px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <Icons.post />
          </div>
          <h2 className="mt-6 text-xl font-semibold">No posts created</h2>
          <p className="mt-3 mb-8 text-center text-sm font-normal leading-6 text-slate-700">
            You don&apos;t have any posts yet. Start creating content.
          </p>
          <button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex gap-1 items-center"
            )}
          >
            <Icons.add className="w-4" />
            New Post
          </button>
        </div>
      </div>
    </DashboardShell>
  );
};

export default page;
