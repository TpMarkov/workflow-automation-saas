"use client"
import React from 'react'
import {useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows} from "@/features/workflows/hooks/use-workflows";
import {
    EmptyView,
    EntityContainer,
    EntityHeader, EntityItem, EntityList,
    EntityPagination,
    EntitySearch, ErrorView, LoadingView
} from "@/components/entity-components";
import {useUpgradeModal} from "@/hooks/use-upgrade-modal";
import {useRouter} from "next/navigation";
import {useWorkflowsParams} from "@/features/workflows/hooks/use-workflows-params";
import {useEntitySearch} from "@/hooks/use-entity-search";
import {Workflow} from "@/generated/prisma/client";
import {useTRPC} from "@/trpc/client";
import {WorkflowIcon} from "lucide-react"
import {formatDistanceToNow} from "date-fns"
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows()

    return (
        <EntityList
            items={workflows.data.items}
            emptyView={<WorkflowsEmptyView/>}
            getKey={(workflow) => workflow.id}
            renderItem={(workflow) => <WorkflowItem data={workflow}/>}
        />
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

export const WorkflowSearch = () => {
    const [params, setParams] = useWorkflowsParams()
    const {searchValue, onSearchChange} = useEntitySearch({params, setParams})

    return <EntitySearch value={searchValue} onChange={onSearchChange} placeholder={"Search Workflows"}/>
}

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows()
    const [params, setParams] = useWorkflowsParams()


    return <EntityPagination page={params.page}
                             disabled={workflows.isFetching}
                             totalPages={workflows.data.totalPages} onPageChange={(page) =>
        setParams({...params, page})
    }/>
}

export const WorkflowsLoadingView = () => {
    return <LoadingView message={"Loading Workflows..."}/>
}

export const WorkflowsError = () => {
    return <ErrorView message="Error loading workflows"/>
}

export const WorkflowsEmptyView = () => {
    const createWorkflow = useCreateWorkflow()
    const {handleError, modal} = useUpgradeModal()
    const router = useRouter()

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => handleError(error),
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            }
        })
    }

    return (
        <>
            <EmptyView
                onNew={handleCreate}
                message={"You haven't created any workflows. Get started by creating your first workflow"}
            />
        </>
    )
}

interface WorkflowItemProps {
    data: Workflow
}

export const WorkflowItem = ({data}: WorkflowItemProps) => {
    const removeWorkflow = useRemoveWorkflow()

    const handleRemove = () => {
        removeWorkflow.mutate({id: data.id})
    }

    return (
        <EntityItem
            subtitle={
                <>
                    Updated {formatDistanceToNow(data.updatedAt, {
                    addSuffix: true
                })}{" "}&bull; Created{" "}{formatDistanceToNow(data.createdAt, {
                    addSuffix: true
                })}
                </>
            }
            isRemoving={removeWorkflow.isPending}
            href={`/workflows/${data.id}`}
            title={data.name}
            onRemove={handleRemove}
            image={
                <div className={"size-8 flex items-center justify-center"}>
                    <WorkflowIcon className={"size-5 text-muted-foreground"}/>
                </div>
            }
        />
    )
}

export const WorkflowsContainer = (
    {
        children
    }
    :
    {
        children: React.ReactNode
    }
) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader/>}
            search={<WorkflowSearch/>}
            pagination={<WorkflowsPagination/>}>
            {children}
        </EntityContainer>
    )
}

