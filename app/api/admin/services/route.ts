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
            services: { orderBy: { createdAt: "desc" } },
          },
        },
      },
    });

    if (!user || user.salons.length === 0) {
      return NextResponse.json({ error: "No salon found" }, { status: 404 });
    }

    const salon = user.salons[0];
    return NextResponse.json({ services: salon.services });
  } catch (error) {
    console.error("Admin services error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "hairq-secret") as {
      userId: string;
    };

    const { name, price, duration } = await req.json();
    if (!name || !price || !duration) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { salons: true },
    });

    if (!user || user.salons.length === 0) {
      return NextResponse.json({ error: "No salon found" }, { status: 404 });
    }

    const service = await prisma.service.create({
      data: {
        name,
        price: Number(price),
        duration: Number(duration),
        salonId: user.salons[0].id,
      },
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
