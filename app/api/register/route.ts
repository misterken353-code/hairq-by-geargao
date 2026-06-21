import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, phone, password, salonName, salonSlug } = await req.json();

    if (!name || !email || !password || !salonName || !salonSlug) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบ" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "อีเมลนี้ถูกใช้แล้ว" },
        { status: 400 }
      );
    }

    const existingSalon = await prisma.salon.findUnique({
      where: { slug: salonSlug },
    });

    if (existingSalon) {
      return NextResponse.json(
        { error: "Slug นี้ถูกใช้แล้ว" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        salons: {
          create: {
            slug: salonSlug,
            name: salonName,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "สมัครสมาชิกสำเร็จ", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}
