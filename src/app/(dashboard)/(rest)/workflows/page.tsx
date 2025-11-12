import React, {Suspense} from 'react'
import {requireAuth} from "@/lib/require-auth";
import {prefetchWorkflows} from "@/features/workflows/server/prefetch";
import {HydrateClient} from "@/trpc/server";
import WorkflowsList from "@/components/workflows-list";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";

const Page = async () => {
    await requireAuth()
    prefetchWorkflows()

    return (
        <HydrateClient>
            <Suspense fallback={<p>Loading...</p>}>
                <WorkflowsList/>
            </Suspense>
        </HydrateClient>
    )
}
export default Page
