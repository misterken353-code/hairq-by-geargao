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
            staff: { orderBy: { name: "asc" } },
          },
        },
      },
    });

    if (!user || user.salons.length === 0) {
      return NextResponse.json({ error: "No salon found" }, { status: 404 });
    }

    const salon = user.salons[0];
    return NextResponse.json({ staff: salon.staff });
  } catch (error) {
    console.error("Admin staff error:", error);
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

    const { name, phone, role } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Missing name" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { salons: true },
    });

    if (!user || user.salons.length === 0) {
      return NextResponse.json({ error: "No salon found" }, { status: 404 });
    }

    const staff = await prisma.staff.create({
      data: {
        name,
        phone: phone || null,
        role: role || "ช่าง",
        salonId: user.salons[0].id,
      },
    });

    return NextResponse.json({ staff }, { status: 201 });
  } catch (error) {
    console.error("Create staff error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}