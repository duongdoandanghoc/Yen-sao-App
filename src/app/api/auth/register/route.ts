import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

// Web cần dynamic để nhận POST requests, mobile thì cho phép static
export const dynamic = "force-static";

export async function POST(request: NextRequest) {
  if (isMobile) {
    return NextResponse.json({ error: "API not available in mobile static build" }, { status: 400 });
  }

  try {
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin (Tên, Email, Mật khẩu)" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    // 1. Kiểm tra xem email đã tồn tại trong database chưa
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email này đã được đăng ký, vui lòng sử dụng email khác" },
        { status: 400 }
      );
    }

    // 2. Hash mật khẩu để bảo mật
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Tạo user thực tế trong MongoDB
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: "USER" // Mặc định là USER
      },
    });

    return NextResponse.json({
      message: "Đăng ký thành công",
      user: { name: newUser.name, email: newUser.email },
    }, { status: 201 });

  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi hệ thống, vui lòng thử lại sau" },
      { status: 500 }
    );
  }
}
