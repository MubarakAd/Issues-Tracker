'use client'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Button, Flex } from '@radix-ui/themes';
import { AiOutlineDelete } from "react-icons/ai";
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface DeleteIssueProps {
  id: string;
}

const DeleteIssue: React.FC<DeleteIssueProps> = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/issues/${id}`);
      router.push('/showIssuePage'); // Redirect after deletion
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out">
          <AiOutlineDelete className="text-lg" />
          <span>Delete</span>
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out" />

        <AlertDialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm p-6 bg-white rounded-lg shadow-lg transition duration-300 ease-out"
        >
          <AlertDialog.Title className="text-lg font-semibold text-gray-800">Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-gray-600 mt-2">
            Are you sure you want to delete this issue? This action cannot be undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="6" justify="end">
            <AlertDialog.Cancel asChild>
              <Button variant="soft"  className=" bg-gray-400 mx-2 my-3 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 ease-in-out">
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <Button
                onClick={handleDelete}
                className="bg-red-600 text-white rounded-md my-3 px-4 py-2 shadow hover:bg-red-700 transition duration-300 ease-in-out"
              >
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteIssue;
