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
              include: { customer: true, service: true },
              orderBy: { createdAt: "desc" },
            },
            services: true,
          },
        },
      },
    });

    if (!user || user.salons.length === 0) {
      return NextResponse.json({ error: "No salon found" }, { status: 404 });
    }

    const salon = user.salons[0];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayBookings = salon.bookings.filter(
      (b) => new Date(b.date) >= today && new Date(b.date) < tomorrow
    );

    const tomorrowBookings = salon.bookings.filter(
      (b) => {
        const d = new Date(b.date);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === tomorrow.getTime();
      }
    );

    const todayRevenue = todayBookings
      .filter((b) => b.paid)
      .reduce((sum, b) => sum + b.price, 0);

    const recentBookings = salon.bookings.slice(0, 10);

    return NextResponse.json({
      salon: {
        id: salon.id,
        name: salon.name,
        slug: salon.slug,
      },
      stats: {
        todayBookings: todayBookings.length,
        todayRevenue,
        todayCustomers: new Set(todayBookings.map((b) => b.customerId)).size,
        tomorrowBookings: tomorrowBookings.length,
      },
      recentBookings: recentBookings.map((b) => ({
        id: b.id,
        customerName: b.customer?.name || "",
        time: b.time,
        service: b.service?.name || "",
        status: b.status,
        paid: b.paid,
      })),
      services: salon.services.map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
      })),
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
