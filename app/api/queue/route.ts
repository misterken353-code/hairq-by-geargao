import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const salonId = searchParams.get("salonId");
    const date = searchParams.get("date");

    if (!salonId) {
      return NextResponse.json(
        { error: "กรุณาระบุร้าน" },
        { status: 400 }
      );
    }

    const where: any = { salonId };
    if (date) {
      where.date = {
        gte: new Date(date),
        lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)),
      };
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: true,
        service: true,
        staff: true,
      },
      orderBy: { time: "asc" },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Queue error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
