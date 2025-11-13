"use client"
import React from 'react'
import {useCreateWorkflow, useSuspenseWorkflows} from "@/features/workflows/hooks/use-workflows";
import {EntityContainer, EntityHeader} from "@/components/entity-components";
import {useUpgradeModal} from "@/hooks/use-upgrade-modal";
import {useRouter} from "next/navigation";

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows()

    return (
        <div className={"flex flex-1 justify-center items-center"}>
            {workflows.data.length === 0 ? <p className={"text-red-500 font-bold text-xl"}>No workflows yet</p> : <pre>
                {JSON.stringify(workflows.data, null, 2)}
            </pre>}
        </div>
    )
}

export const WorkflowsHeader = ({disabled}: { disabled?: boolean }) => {

    const createWorkflows = useCreateWorkflow()
    const {handleError, modal} = useUpgradeModal()
    const router = useRouter()

    const handleCreate = () => {
        createWorkflows.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }

    return <>
        {modal}
        <EntityHeader title={"Workflows"}
                      description={"Create and manage your workflows"}
                      onNew={handleCreate}
                      newButtonLabel={"New Workflow"}
                      disabled={createWorkflows.isPending}
                      isCreating={createWorkflows.isPending}
        />
    </>
}

export const WorkflowsContainer = ({children}: { children: React.ReactNode }) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader/>}
            search={<></>}
            pagination={<></>}>
            {children}
        </EntityContainer>
    )
}