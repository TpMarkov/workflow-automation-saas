"use client"
import React from 'react'
import {useCreateWorkflow, useSuspenseWorkflows} from "@/features/workflows/hooks/use-workflows";
import {EntityContainer, EntityHeader, EntitySearch} from "@/components/entity-components";
import {useUpgradeModal} from "@/hooks/use-upgrade-modal";
import {useRouter} from "next/navigation";
import {useWorkflowsParams} from "@/features/workflows/hooks/use-workflows-params";
import {useEntitySearch} from "@/hooks/use-entity-search";

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows()

    return (
        <div className={"flex justify-center items-center flex-1"}>
            {workflows.data.items.length === 0 ? <p className={"text-red-500 font-bold text-xl"}>No workflows yet</p> :
                <pre>
                    {JSON.stringify(workflows.data, null, 4)}
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
            search={<WorkflowSearch/>}
            pagination={<></>}>
            {children}
        </EntityContainer>
    )
}

export const WorkflowSearch = () => {
    const [params, setParams] = useWorkflowsParams()
    const {searchValue, onSearchChange} = useEntitySearch({params, setParams})

    return <EntitySearch value={searchValue} onChange={onSearchChange} placeholder={"Search Workflows"}/>
}