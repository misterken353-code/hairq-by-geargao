import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");

    if (!salonId) {
      return NextResponse.json(
        { error: "กรุณาระบุร้าน" },
        { status: 400 }
      );
    }

    const services = await prisma.service.findMany({
      where: { salonId, isActive: true },
      orderBy: { name: "asc" },
    });

    const staff = await prisma.staff.findMany({
      where: { salonId, isActive: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ services, staff });
  } catch (error) {
    console.error("Services error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
