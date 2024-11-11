'use client'
import { Theme, Avatar, DropdownMenu } from '@radix-ui/themes'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import LogOut from '../logout/logOut'

const DropDown = () => {
  const { data: session } = useSession()
  const userImage = session?.user?.image || ""
  const fallbackInitial = session?.user?.email ? session.user.email[0].toUpperCase() : "?"
  console.log("session",session)
  return (
    <Theme >
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
        <div className="cursor-pointer bg-slate-400 w-8 h-8 rounded-full overflow-hidden">
  <Avatar src={userImage} fallback={fallbackInitial} />
</div>

        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white shadow-lg rounded-lg p-2 mt-2 w-48">
          <DropdownMenu.Item className="p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-200">
            {session?.user?.email}
          </DropdownMenu.Item>
          <DropdownMenu.Item className="p-2 text-sm text-red-600 hover:bg-red-100 rounded-md transition duration-200">
            <LogOut />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Theme>
  )
}

export default DropDown
