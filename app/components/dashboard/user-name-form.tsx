"use client";

import { cn } from "@/app/lib/utils";
import { userNameSchema } from "@/app/lib/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { buttonVariants } from "../ui/button";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">;
}

type FormData = z.infer<typeof userNameSchema>;

const UserNameForm = ({ user, className, ...props }: UserNameFormProps) => {
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
      }),
    });

    setIsSaving(false);
  }

  return (
    <div className="border rounded-md">
      <div className="p-4">
        <h3 className="text-slate-800 text-lg font-medium">Your Name</h3>
        <p className="text-slate-600">
          Please enter your full name or a display name you are comfortable
          with.
        </p>
      </div>

      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          className="w-[400px] m-4"
          size={32}
          {...register("name")}
        />
        <div className="p-3 border-t bg-slate-100">
          <button className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserNameForm;
