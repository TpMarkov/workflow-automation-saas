"use client"
import React from 'react'
import {useSuspenseWorkflows} from "@/features/workflows/hooks/use-workflows";
import {EntityContainer, EntityHeader} from "@/components/entity-components";

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

    return <>
        <EntityHeader title={"Workflows"}
                      description={"Create and manage your workflows"}
                      onNew={() => {
                      }}
                      newButtonLabel={"New Workflow"}
                      disabled={disabled}
                      isCreating={false}
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