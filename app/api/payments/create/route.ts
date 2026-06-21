import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createMoneySpaceClient } from "@/lib/moneyspace";

export async function POST(req: Request) {
  try {
    const {
      salonId,
      bookingId,
      amount,
      description,
      customerName,
      customerPhone,
      customerEmail,
      paymentMethod = "qr",
      redirectUrl,
    } = await req.json();

    if (!salonId || !amount || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบ" },
        { status: 400 }
      );
    }

    const salon = await prisma.salon.findUnique({ where: { id: salonId } });
    if (!salon) {
      return NextResponse.json({ error: "ไม่พบร้าน" }, { status: 404 });
    }

    // สร้าง payment record ใน DB ก่อน
    const payment = await prisma.payment.create({
      data: {
        amount,
        currency: "THB",
        status: "pending",
        method: paymentMethod,
        provider: "moneyspace",
        salonId,
        bookingId: bookingId || null,
      },
    });

    // สร้าง payment กับ MoneySpace
    const client = createMoneySpaceClient();
    if (!client) {
      // ถ้าไม่ได้ configure MoneySpace ให้ return QR mock หรือ error
      return NextResponse.json(
        {
          error: "MoneySpace ยังไม่ได้ตั้งค่า",
          paymentId: payment.id,
          note: "กรุณาใส่ MONEYSPACE_SECRET_ID และ MONEYSPACE_SECRET_KEY ใน .env.local",
        },
        { status: 503 }
      );
    }

    const msPayment = await client.createPayment({
      amount: amount * 100, // แปลงเป็น satang
      description: description || `ชำระเงิน ${salon.name}`,
      orderId: payment.id,
      customerName,
      customerPhone,
      customerEmail,
      redirectUrl:
        redirectUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
      paymentMethod: paymentMethod as "qr" | "creditcard" | "installment",
    });

    // อัปเดต payment record ด้วย transaction ID และ QR code
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        transactionId: msPayment.id,
        qrCodeUrl: msPayment.qrCodeUrl,
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      transactionId: msPayment.id,
      qrCodeUrl: msPayment.qrCodeUrl,
      paymentUrl: msPayment.paymentUrl,
      status: msPayment.status,
      expiresAt: msPayment.expiresAt,
    });
  } catch (error) {
    console.error("Create payment error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสร้างรายการชำระเงิน" },
      { status: 500 }
    );
  }
}
