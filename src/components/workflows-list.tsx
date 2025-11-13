"use client"
import React from 'react'
import {useSuspenseWorkflows} from "@/features/workflows/hooks/use-workflows";
import {Button} from "@/components/ui/button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useTRPC} from "@/trpc/client";

const WorkflowsList = () => {
    const {data: workflows} = useSuspenseWorkflows()
    const trpc = useTRPC()
    const createWorkFlow = useMutation(trpc.workflows.create.mutationOptions())
    const queryClient = useQueryClient()
    const onCreateWorkflow = async () => {
        createWorkFlow.mutate()
        await queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions())
    }
    return (
        <div>
            {workflows && workflows.length === 0 ? (
                <p>No workflows found.</p>
            ) : (
                <pre>{JSON.stringify(workflows, null, 2)}</pre>
            )}
            <Button onClick={() => onCreateWorkflow()}>Create WorkFLow</Button>

        </div>
    )
}
export default WorkflowsList
