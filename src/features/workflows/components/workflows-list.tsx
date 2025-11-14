"use client"
import React from 'react'
import {useCreateWorkflow, useSuspenseWorkflows} from "@/features/workflows/hooks/use-workflows";
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

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows()

    return (
        <EntityList
            items={workflows.data.items}
            emptyView={<WorkflowsEmptyView/>}
            getKey={(workflow) => workflow.id}
            renderItem={(wf) => <WorkflowItem workflow={wf}/>}
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

export const WorkflowItem = ({workflow}) => {
    return (
        <EntityItem
            subtitle={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, repudiandae."}
            href={`/workflows/${workflow.id}`}
            title={workflow.name}
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

