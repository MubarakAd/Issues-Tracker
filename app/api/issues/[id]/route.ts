import { PrismaClient } from "@prisma/client";
import { notFound} from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Description is required"),
});

const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}
export async function PATCH(req: NextRequest, { params }: Props) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: validation.error.errors },
      { status: 400 }
    );
  }

  const { title, description } = validation.data;
  
  try {
    const updatedIssue = await prisma.issue.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ issue: updatedIssue }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error updating issue:", error);
    return NextResponse.json(
      { message: "Failed to update issue", error: errorMessage },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest, { params }: Props) {
    try {
      const deleteIssue = await prisma.issue.delete({
        where: {
          id: parseInt(params.id),
        },
      });
      
      return NextResponse.json(
        { message: "Issue deleted successfully", issue: deleteIssue },
        { status: 200 }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error deleting issue:", error);
      return NextResponse.json(
        { message: "Failed to delete issue", error: errorMessage },
        { status: 500 }
      );
    }
  }
  