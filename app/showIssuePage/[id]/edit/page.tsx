import Issue from '@/components/Issue/Issue';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import * as React from 'react'

interface Props {
  params: { id: string };
}

const prisma = new PrismaClient();

const Page = async ({ params }: Props) => {
  const { id } = await params;
  
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  
  if (!issue) {
    notFound();
  }

  return (
    <Issue issue={issue} />
  );
};

export default Page;
