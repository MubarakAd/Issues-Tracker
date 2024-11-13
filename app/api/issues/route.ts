import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import { authOptions } from "../auth/[...nextauth]/route";
const schema=z.object({
    title:z.string().min(2,"Title is required"),
    description:z.string().min(2,"Description is required"),
    userId:z.number()
})
const prisma =new PrismaClient()
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    console.log("route session is",session)
    console.log("req is", req);
    
    try {
      const issues = await prisma.issue.findMany({
        where:{
            userId:Number(session?.user.id!)
        }

      });
      return NextResponse.json({ issues }, { status: 200 });
    } catch (error) {
       
        
      return NextResponse.json({ message: "Failed to fetch issues", error }, { status: 500 });
    }
  }

export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions);
    const body=await req.json()
    const validation= schema.safeParse(body)
    console.log("validation is",validation)
    
    if (!validation.success){
        return NextResponse.json({message: "User already exists"},{status:404})
    }
    const {title,description}=validation.data
    const userId = Number(session?.user.id!)
    const newIssue=await prisma.issue.create({
        data:{
            title,
            description,
            userId
        }
    })
    try {
        return NextResponse.json({issue:newIssue},{status:200})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to create issue", error }, { status: 500 });
        
    }
    
}