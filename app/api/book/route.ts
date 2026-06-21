import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, phone, serviceId, staffId, date, time, salonId } = await req.json();

    if (!name || !phone || !serviceId || !date || !time || !salonId) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบ" },
        { status: 400 }
      );
    }

    // หาลูกค้าจากเบอร์โทร "ภายในร้านนี้" เท่านั้น
    // (ลูกค้าคนเดียวกันที่จองหลายร้าน จะถูกแยกเป็นคนละ record ต่อร้าน)
    let customer = await prisma.customer.findFirst({
      where: { phone, salonId },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: { name, phone, salonId },
      });
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    const booking = await prisma.booking.create({
      data: {
        date: new Date(date),
        time,
        salonId,
        serviceId,
        staffId: staffId || null,
        customerId: customer.id,
        price: service?.price || 0,
        status: "pending",
      },
    });

    return NextResponse.json(
      { message: "จองคิวสำเร็จ", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}