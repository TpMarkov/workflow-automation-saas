import React from 'react'
import {requireAuth} from "@/lib/require-auth";

const Page = async () => {
    await requireAuth()
    return (
        <div>Execution page</div>
    )
}
export default Page
