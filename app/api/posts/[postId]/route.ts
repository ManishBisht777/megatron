import { prisma } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, res: Response) {
  const currentUser = await getCurrentUser();

  console.log(currentUser);
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
