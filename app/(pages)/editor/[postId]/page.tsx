import Editor from "@/app/components/editor/editor";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/session";
import { Post, User } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface EditorPageProps {
  params: { postId: string };
}

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  const post = await getPostForUser(params.postId, user.id);

  if (!post) {
    notFound();
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  );
}
