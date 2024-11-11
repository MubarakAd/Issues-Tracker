import Issue from '@/components/Issue/Issue'
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const page = async() => {
  const session=await getServerSession(authOptions)
  console.log("session is",session)
  return (
    <>
    <h1>{session?.user?.email}</h1>
        <h1>{session?.user?.name}</h1>
    <Issue/>
    </>
  )
}

export default page