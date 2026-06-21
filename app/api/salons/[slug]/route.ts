import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const salon = await prisma.salon.findUnique({
      where: { slug },
      include: {
        services: { where: { isActive: true }, orderBy: { name: "asc" } },
        staff: { where: { isActive: true }, orderBy: { name: "asc" } },
      },
    });

    if (!salon) {
      return NextResponse.json({ error: "ไม่พบร้าน" }, { status: 404 });
    }

    return NextResponse.json({ salon });
  } catch (error) {
    console.error("Salon lookup error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
