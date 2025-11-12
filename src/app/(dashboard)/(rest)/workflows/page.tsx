import React from 'react'
import {requireAuth} from "@/lib/require-auth";
import {TestButton} from "@/components/test-button";

const Page = async () => {
    await requireAuth()

    return (
        <div className={"flex gap-6 flex-col"}>
            <h1>Workflow page</h1>
            <TestButton/>
        </div>
    )
}
export default Page
