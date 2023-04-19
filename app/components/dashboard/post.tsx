import { formatDate } from "@/app/lib/utils";
import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PostOperations from "./post-operation";

interface PostItemProps {
  post: Pick<Post, "id" | "title" | "createdAt" | "published">;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-slate-600">
            {formatDate(post.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <PostOperations
        post={{
          id: post.id,
          title: post.title,
        }}
      />
      {/* <PostOperations post={{ id: post.id, title: post.title }} /> */}
    </div>
  );
};

export default PostItem;
