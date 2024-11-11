import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    age: z.number().min(18, { message: "Age must be at least 18" }), // Number validation
    gender: z.enum(['male', 'female', 'other'], { message: "Invalid gender" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});
export async function POST(req: NextRequest) {
    const body = await req.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
    }
    const { name, email, age, gender, password } = validation.data;
    // Check if the user already exists
    const checkUser = await prisma.user.findUnique({
        where: { email },
    });

    if (checkUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                age: Number(age),
                gender,
                password: hashedPassword, // Store hashed password
            },
        });

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to create user", error }, { status: 500 });
    }
}
