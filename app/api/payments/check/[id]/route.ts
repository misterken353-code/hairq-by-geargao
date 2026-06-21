import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createMoneySpaceClient } from "@/lib/moneyspace";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: { booking: true },
    });

    if (!payment) {
      return NextResponse.json({ error: "ไม่พบรายการ" }, { status: 404 });
    }

    // ถ้ามี transaction ID ให้ sync กับ MoneySpace
    if (payment.transactionId) {
      const client = createMoneySpaceClient();
      if (client) {
        try {
          const msPayment = await client.checkPaymentStatus(payment.transactionId);

          // อัปเดตสถานะถ้ามีการเปลี่ยนแปลง
          if (msPayment.status !== payment.status) {
            const updateData: Record<string, unknown> = { status: msPayment.status };

            if (msPayment.status === "paid" && !payment.paidAt) {
              updateData.paidAt = new Date();

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

            return NextResponse.json({ ...payment, ...updateData, status: msPayment.status });
          }
        } catch (err) {
          console.warn("MoneySpace sync failed:", err);
        }
      }
    }

    return NextResponse.json(payment);
  } catch (error) {
    console.error("Check payment error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
