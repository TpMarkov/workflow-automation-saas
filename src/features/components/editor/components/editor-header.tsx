"use client"
import {useRef} from 'react'
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {SaveIcon} from "lucide-react";
import {EditIcon} from "lucide-react/dist/lucide-react.suffixed";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbEllipsis,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useSuspenseWorkflow, useUpdateWorkflowName} from "@/features/workflows/hooks/use-workflows";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

export const EditorHeader = ({workflowId}: { workflowId: string }) => {
    return (
        <header className={"flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background"}>
            <SidebarTrigger/>
            <div className={'flex flex-row items-center justify-between w-full gap-x-4'}>
                <EditorBreadcrump workflowId={workflowId}/>
                <EditorSaveButton workflowId={workflowId}/>
            </div>
        </header>
    )
}


const EditorSaveButton = ({workflowId}: { workflowId: string }) => {
    return (
        <div className={"ml-auto"}>
            <Button size={"sm"}>
                <SaveIcon className={"size-4"}/>
                Save
            </Button>
        </div>
    )
}
export default EditorSaveButton

const EditorBreadcrump = ({workflowId}: { workflowId: string }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/workflows" prefetch>
                            Workflows
                        </Link>
                    </BreadcrumbLink>
                    <EditorNameInput workflowId={workflowId}/>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
            </BreadcrumbList>
        </Breadcrumb>
    )
}


export const EditorNameInput = ({workflowId}: { workflowId: string }) => {
    const {data: workflow} = useSuspenseWorkflow(workflowId)
    const [name, setName] = useState(workflow.name)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const updateWorkflowName = useUpdateWorkflowName()

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setName(workflow.name)
    }, [workflow.name]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])


    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave()
            setIsEditing(false)
        } else if (e.key === "Escape") {
            setName(workflow.name)
            setIsEditing(false)
        }
    }
    const handleSave = async () => {

        try {
            await updateWorkflowName.mutateAsync({id: workflowId, name})
        } catch {
            setName(workflow.name)
            toast.error("Failed to update name")
        } finally {
            setIsEditing(false)
        }

        if (name === workflow.name) {
            setIsEditing(false)
            return
        }

    }

    if (isEditing) {
        return <Input
            disabled={updateWorkflowName.isPending}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(false)}
            ref={inputRef} value={name}
            onChange={(e) => setName(e.target.value)}
            className={"h-7 w-auto m-w[100px] px-2"}
        />
    }


    if (!workflow) {
        return
    }

    return (
        <Tooltip>
            <TooltipTrigger>
                <TooltipContent>
                    Double click to update name
                </TooltipContent>
                <Breadcrumb className={"cursor-pointer hover:text-foreground transition-colors"}
                            onDoubleClick={() => setIsEditing(true)}
                >
                    {workflow.name}
                </Breadcrumb>
            </TooltipTrigger>
        </Tooltip>
    )
}