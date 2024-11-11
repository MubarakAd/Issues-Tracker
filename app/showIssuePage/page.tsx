"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";

interface IssueData {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  issue: string;
}

const Page = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Ensure rows per page is set to 10
  const [issues, setIssues] = useState<IssueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch("/api/issues");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIssues(data.issues || []);
        console.log("Fetched issues:", data.issues); // Log the fetched issues
      } catch (err) {
        console.error("Failed to fetch issues:", err);
        setError("Failed to fetch issues.");
      } finally {
        setLoading(false);
      }
    }
    fetchIssues();
  }, []);

  const pages = Math.ceil(issues.length / rowsPerPage); // Calculate total pages
  console.log("Total pages:", pages); // Log total pages

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return issues.slice(start, end); // Slice issues for current page
  }, [page, issues]);

  // if (loading) {
  //   return <div>Loading...</div>; // Display loading state
  // }

  if (error) {
    return <div>{error}</div>; // Display error message
  }
  console.log("data is",items)

  return (
    <Table
      aria-label="Issue Table with Pagination"
      bottomContent={
        <div className="flex w-full justify-center mt-4">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="title">Title</TableColumn>
        <TableColumn key="issue">Issue</TableColumn>
        <TableColumn key="createdAt">Created At</TableColumn>
        <TableColumn key="description">Description</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item: IssueData) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "title" ? (
                  <Link href={`/showIssuePage/${item.id}`} passHref>
                   {item.title}
                  </Link>
                ) : (
                    
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Page;
