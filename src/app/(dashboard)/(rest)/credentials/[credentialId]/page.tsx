import React from 'react'
import {requireAuth} from "@/lib/require-auth";

interface PageProps {
    params: Promise<{
        credentialId: string
    }>
}

const Page = async ({params}: PageProps) => {
    await requireAuth()

    const {credentialId} = await params

    return (
        <p>Credential ID: {credentialId} </p>
    )
}
export default Page
