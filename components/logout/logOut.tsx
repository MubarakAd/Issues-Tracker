'use client'
import { Avatar, Button, DropdownMenu } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
const LogOut=  ()=>{
    const { data: session, status } = useSession()
    const router= useRouter()
    return (
        <div>
            {status==="authenticated"?<Button onClick={()=>(
            signOut({ callbackUrl: '/LoginFormPage' })
        )}>LogOut</Button>:<Button onClick={()=>(
            router.push('/LoginFormPage')
        )} >signIn</Button>}
        </div>
    )
}
export default LogOut