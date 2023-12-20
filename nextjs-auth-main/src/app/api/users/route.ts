import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (req: Request) => {
  try {
    const allUsers = await prisma.user.findMany();
    return NextResponse.json({
      users: allUsers,
      message: "All users retrieved",
    });
  } catch (error) {
    return NextResponse.error();
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { email, name, avatar, role, hospital, city, country } = body;

    const updatedorCreatedUser = await prisma.user.upsert({
      where: { email: email },
      create: {
        email: email,
        name: name,
        avatar: avatar,
        role: role,
        hospital: hospital,
        city: city,
        country: country
      },
      update: {
        name: name,
        avatar: avatar,
        role: role,
        hospital: hospital,
        city: city,
        country: country
      },
    });

    return NextResponse.json(
      { user: updatedorCreatedUser, message: "User created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.error();
  }
};
