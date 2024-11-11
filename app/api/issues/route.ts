import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
const schema=z.object({
    title:z.string().min(2,"Title is required"),
    description:z.string().min(2,"Description is required")
})
const prisma =new PrismaClient()

export async function GET(req: NextRequest) {
    try {
      const issues = await prisma.issue.findMany();
      return NextResponse.json({ issues }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to fetch issues", error }, { status: 500 });
    }
  }

export async function POST(req:NextRequest){
    const body=await req.json()
    const validation= schema.safeParse(body)
    console.log("validation is",validation)
    
    if (!validation.success){
        return NextResponse.json({message: "User already exists"},{status:404})
    }
    const {title,description}=validation.data
    const newIssue=await prisma.issue.create({
        data:{
            title,
            description
        }
    })
    try {
        return NextResponse.json({issue:newIssue},{status:200})
        
    } catch (error) {
        return NextResponse.json({ message: "Failed to create issue", error }, { status: 500 });
        
    }
    
}