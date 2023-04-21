import { prisma } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/session";
import { userNameSchema } from "@/app/lib/validation/user";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(req: Request, res: NextApiResponse) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found.");
    }

    const body = await req.json();
    if (body?.name) {
      const payload = userNameSchema.parse(body);
      console.log(payload);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: payload.name,
        },
      });
    }
    return res.end();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.error();
    }
    return NextResponse.error();
  }
}
