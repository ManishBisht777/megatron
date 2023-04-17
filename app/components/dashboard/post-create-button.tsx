"use client";

import React from "react";
import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { Icons } from "@/app/components/ui/icons";
import axios from "axios";

interface PostCreateButtonProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {}

const PostCreateButton = ({ className, ...props }: PostCreateButtonProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function createPost() {
    setIsLoading(true);

    const response = await axios.post(
      "/api/posts",
      JSON.stringify({
        title: "Untilted Post",
      })
    );
    setIsLoading(false);

    console.log(response.data);
  }

  return (
    <button
      className={cn(
        buttonVariants(),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
      onClick={createPost}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      New post
    </button>
  );
};

export default PostCreateButton;
