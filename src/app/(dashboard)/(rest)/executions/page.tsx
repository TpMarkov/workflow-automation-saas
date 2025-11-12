import React from 'react'
import {requireAuth} from "@/lib/require-auth";

const Page = async () => {
    await requireAuth()

    return (
        <p>Executions page</p>
    )
}
export default Page
