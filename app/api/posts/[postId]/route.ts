import { prisma } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/session";
import { postPatchSchema } from "@/app/lib/validation/post";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(req: Request, res: Response) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const postId = req.url.split("posts/")[1];

  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return NextResponse.json("deleted");
  } catch (error) {}
}

export async function PATCH(req: Request, res: NextApiResponse) {
  try {
    const postId = req.url.split("posts/")[1];
    const post: any = prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Post not found.");
    }
    const body = await req.json();
    const body2 = postPatchSchema.parse(body);

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: body2.title || post.title,
        content: body.content,
      },
    });

    return res.end();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.error();
    }
    return NextResponse.error();
  }
}
