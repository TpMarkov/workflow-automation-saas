import React, {Suspense} from 'react'
import {requireAuth} from "@/lib/require-auth";
import {prefetchWorkflow} from "@/features/workflows/server/prefetch";
import {HydrateClient} from "@/trpc/server";
import {ErrorBoundary} from "react-error-boundary";
import {WorkflowsError, WorkflowsList, WorkflowsLoadingView} from "@/features/workflows/components/workflows-list";
import Editor, {EditorError, EditorLoader} from "@/features/components/editor/components/editor";
import {EditorHeader} from "@/features/components/editor/components/editor-header";

interface PageProps {
    params: Promise<{
        workflowId: string
    }>
}


const Page = async ({params}: PageProps) => {
    await requireAuth()
    const {workflowId} = await params

    prefetchWorkflow(workflowId)

    return (
        <HydrateClient>
            <ErrorBoundary fallback={<EditorError/>}>
                <Suspense fallback={<EditorLoader/>}>
                    <EditorHeader workflowId={workflowId}/>
                    <main className={"flex-1"}>
                        <Editor id={workflowId}/>
                    </main>
                </Suspense>
            </ErrorBoundary>
        </HydrateClient>
    )
}
export default Page


