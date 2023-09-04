import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";


export async function PATCH(
  req: Request,
  { params }: { params: { guideId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.guideId) {
      return new NextResponse("Guide id is required", { status: 400 });
    }

    const guide = await prismadb.guide.updateMany({
      where: {
        id: params.guideId,
        userId,
      },
      data: {
        name
      }
    });
  
    return NextResponse.json(guide);
  } catch (error) {
    console.log('[GUIDE_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function DELETE(
  _req: Request,
  { params }: { params: { guideId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.guideId) {
      return new NextResponse("Guide id is required", { status: 400 });
    }

    const guide = await prismadb.guide.deleteMany({
      where: {
        id: params.guideId,
        userId
      }
    });
  
    return NextResponse.json(guide);
  } catch (error) {
    console.log('[GUIDE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
