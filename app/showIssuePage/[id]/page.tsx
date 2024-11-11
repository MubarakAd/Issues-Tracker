import { PrismaClient } from '@prisma/client';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { AiOutlineDelete } from "react-icons/ai";
import React from 'react';
import DeleteIssue from '@/components/delete/delete';

const prisma = new PrismaClient();

interface Props {
  params: { id: string };
}

// Helper function to fetch issue data
async function getIssue(id: string) {
  return await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}

const Page = async ({ params }: Props) => {
  const { id } =await params;
  const singleIssue = await getIssue(id);

  if (!singleIssue) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">{singleIssue.title}</h1>
          <p className="text-sm text-gray-500">
            Created on: <span className="font-medium">{singleIssue.createdAt.toLocaleDateString()}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={`${id}/edit`}>
            <Button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              <HiOutlinePencilSquare />
              <span>Edit</span>
            </Button>
          </Link>
          <DeleteIssue id={id}/>
          {/* <Link href={`${id}/delete`}>
            <Button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              <AiOutlineDelete />
              <span>Delete</span>
            </Button>
          </Link> */}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700">Issue</h2>
        <p className="text-gray-700 mt-2">{singleIssue.issue}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-700">Description</h2>
        <p className="text-gray-600 mt-2">{singleIssue.description}</p>
      </div>
    </div>
  );
};

export default Page;
