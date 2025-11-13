import React from 'react'
import {requireAuth} from "@/lib/require-auth";

interface PageProps {
    params: Promise<{
        workflowId: string
    }>
}

const Page = async ({params}: PageProps) => {
    await requireAuth()

    const {workflowId} = await params
    return (
        <div>Workflow ID : {workflowId}</div>
    )
}
export default Page
