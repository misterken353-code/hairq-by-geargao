import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * MoneySpace Webhook Handler
 *
 * MoneySpace จะส่ง POST request มาที่ endpoint นี้เมื่อมีการเปลี่ยนแปลงสถานะการชำระเงิน
 * ตัวอย่าง payload:
 * {
 *   "id": "txn_xxx",
 *   "status": "paid",
 *   "amount": 10000,
 *   "merchant_order_id": "payment_id_in_our_db",
 *   ...
 * }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: เพิ่ม webhook signature verification ตามเอกสารจริงของ MoneySpace
    // ปกติจะใช้ secret_key ในการ hash ตรวจสอบความถูกต้อง

    const { id, status, merchant_order_id } = body;

    if (!merchant_order_id) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: merchant_order_id },
      include: { booking: true },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // อัปเดตสถานะ payment
    const updateData: Record<string, unknown> = {
      status: status === "paid" ? "paid" : status === "failed" ? "failed" : status,
      transactionId: id,
    };

    if (status === "paid") {
      updateData.paidAt = new Date();

      // อัปเดต booking ว่าชำระแล้ว
      if (payment.bookingId) {
        await prisma.booking.update({
          where: { id: payment.bookingId },
          data: { paid: true, paidAt: new Date() },
        });
      }
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: updateData,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
