"use client"
import {NodeToolbar, Position} from "@xyflow/react";

import {SettingsIcon, TrashIcon} from "lucide-react"
import type {ReactNode} from "react";

import {Button} from "@/components/ui/button";

interface WorkflowNodeProps {
  children: ReactNode
  showToolbar?: boolean
  onDelete?: () => void
  onSettings?: () => void
  name?: string
  description?: string
}

export const WorkflowNode = ({showToolbar, name, description, onSettings, onDelete, children}: WorkflowNodeProps) => {

  return (
      <>
        {showToolbar && (
            <NodeToolbar>
              <Button onClick={onSettings} variant={"ghost"}>
                <SettingsIcon className={"size-4"}/>
              </Button>
              <Button onClick={onDelete} variant={"ghost"}>
                <TrashIcon className={"size-4"}/>
              </Button>
            </NodeToolbar>
        )}
        {children}
        {name && (
            <NodeToolbar position={Position.Bottom}
                         isVisible
                         className={"max-w-[200px] text-center"}
            >
              <p className={"font-medium"}>{name}</p>
              {description && (
                  <p className={"text-muted-foreground text-sm truncate"}>
                    {description}
                  </p>
              )}
            </NodeToolbar>
        )}
      </>
  )
}