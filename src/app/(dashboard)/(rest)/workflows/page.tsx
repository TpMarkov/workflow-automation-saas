import React, {Suspense} from 'react'
import {requireAuth} from "@/lib/require-auth";
import {prefetchWorkflows} from "@/features/workflows/server/prefetch";
import {HydrateClient} from "@/trpc/server";
import {ErrorBoundary} from "react-error-boundary";
import {
    WorkflowsContainer,
    WorkflowsError,
    WorkflowsList,
    WorkflowsLoadingView
} from "@/features/workflows/components/workflows-list";
import type {SearchParams} from "nuqs/server";

import {workflowsParamsLoader} from "@/features/workflows/server/params-loader";

type Props = {
    searchParams: Promise<SearchParams>,
}

const Page = async ({searchParams}: Props) => {
    await requireAuth()
    const params = await workflowsParamsLoader(searchParams)
    prefetchWorkflows(params)

    return (
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<WorkflowsError/>}>
                    <Suspense fallback={<WorkflowsLoadingView/>}>
                        <WorkflowsList/>
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    )
}
export default Page
