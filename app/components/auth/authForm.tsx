import { cn } from "@/app/lib/utils";
import React from "react";
import { buttonVariants } from "../ui/button";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";

type Props = {};

const AuthForm = (props: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <form action="" className="flex flex-col gap-2">
        <Input
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          //   disabled={isLoading || isGitHubLoading}
          //   {...register("email")}
        />
        <button className={cn(buttonVariants())}>
          {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
          Sign In with Email
        </button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        // onClick={() => {
        // setIsGitHubLoading(true)
        // signIn("github")
        // }}
        // disabled={isLoading || isGitHubLoading}
      >
        {/* {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : ( */}
        <Icons.gitHub className="mr-2 h-4 w-4" />
        {/* )}{" "} */}
        Github
      </button>
    </div>
  );
};

export default AuthForm;
