import React, {Suspense} from 'react'
import {requireAuth} from "@/lib/require-auth";
import {prefetchWorkflows} from "@/features/workflows/server/prefetch";
import {HydrateClient} from "@/trpc/server";
import {ErrorBoundary} from "react-error-boundary";
import {WorkflowsContainer, WorkflowsList} from "@/features/workflows/components/workflows-list";

const Page = async () => {
    await requireAuth()

    prefetchWorkflows()

    return (
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<p>Error!</p>}>
                    <Suspense fallback={<p>Loading...</p>}>
                        <WorkflowsList/>
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    )
}
export default Page
