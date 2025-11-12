import React from 'react'
import {requireAuth} from "@/lib/require-auth";

const Page = async () => {
    await requireAuth()

    return (
        <p>Workflow page</p>
    )
}
export default Page
