import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "hairq-secret") as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        salons: {
          include: {
            customers: { orderBy: { createdAt: "desc" } },
          },
        },
      },
    });

    if (!user || user.salons.length === 0) {
      return NextResponse.json({ error: "No salon found" }, { status: 404 });
    }

    const salon = user.salons[0];
    return NextResponse.json({ customers: salon.customers });
  } catch (error) {
    console.error("Admin customers error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
