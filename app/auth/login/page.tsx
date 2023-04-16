import AuthForm from "@/app/components/auth/authForm";
import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/images/logo.png";

type Props = {};

const pages = (props: Props) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 left-4 md:top-8 md:left-8"
        )}
      >
        <>
          <Image className="mr-1" alt="Logo Image" src={logo} width={35} />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center items-center">
          <Image alt="Logo Image" src={logo} width={40} />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enter your email to sign in to your account
          </p>
        </div>
        <AuthForm />
        <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default pages;
