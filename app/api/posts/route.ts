import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "../../lib/session";

const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
});

export async function GET(request: Request) {
  return NextResponse.json("hello");
}

export async function POST(req: Request, res: Response) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const body = await req.json();
    const body2 = postCreateSchema.parse(body);
    const post = await prisma.post.create({
      data: {
        title: body2.title,
        content: body2.content,
        authorId: currentUser.id,
      },
      select: {
        id: true,
      },
    });

    console.log(post);

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.error();
    }

    // if (error instanceof RequiresProPlanError) {
    //   return res.status(402).end()
    // }

    return NextResponse.error();
  }
}
