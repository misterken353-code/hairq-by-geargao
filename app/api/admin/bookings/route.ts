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
            bookings: {
              include: { customer: true, service: true, staff: true },
              orderBy: { date: "asc", time: "asc" },
            },
          },
        },
      },
    });

    if (!user || user.salons.length === 0) {
      return NextResponse.json({ error: "No salon found" }, { status: 404 });
    }

    const salon = user.salons[0];
    const bookings = salon.bookings;

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Admin bookings error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
