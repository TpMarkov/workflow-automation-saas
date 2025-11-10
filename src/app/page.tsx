import React from 'react'
import prisma from "@/lib/db"

const Page = async () => {
    const users = await prisma.user.findMany()

    return (
        <div className={"flex items-center justify-center min-w-screen min-h-screen"}>
            {JSON.stringify(users, null, 2)}
        </div>
    )
}
export default Page
