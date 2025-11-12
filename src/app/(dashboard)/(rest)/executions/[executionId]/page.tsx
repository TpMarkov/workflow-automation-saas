import React from 'react'
import {requireAuth} from "@/lib/require-auth";

interface PageProps {
    params: Promise<{
        executionId: string
    }>
}

const Page = async ({params}: PageProps) => {
    await requireAuth()
    const {executionId} = await params

    return (
        <p>Execution ID: {executionId} </p>
    )
}
export default Page
