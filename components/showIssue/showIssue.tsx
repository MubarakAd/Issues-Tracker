// pages/issuePage.tsx

import { PrismaClient } from '@prisma/client';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const prisma = new PrismaClient();

interface IssueData {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  issue: string;
}

interface ShowIssueProps {
  issues: IssueData[];
}

export const getServerSideProps = async () => {
  const issues = await prisma.issue.findMany();
  return { props: { issues } };
};

const ShowIssue: React.FC<ShowIssueProps> = ({ issues }) => {
  return (
    <>
      <Button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Link href="/issuePage">New Issue</Link>
      </Button>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>CreatedAt</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
              <Table.Cell>{issue.description}</Table.Cell>
              <Table.Cell>{issue.issue}</Table.Cell>
              <Table.Cell>{issue.createdAt.toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default ShowIssue;
