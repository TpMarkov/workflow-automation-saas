"use client"
import React, {memo, type ReactNode} from 'react'
import type {LucideIcon} from "lucide-react"
import Image from "next/image"

import {BaseNode, BaseNodeContent} from "@/components/react-flow/base-node"
import {BaseHandle} from "@/components/react-flow/base-handle";
import {NodeProps, Position} from "@xyflow/react";
import {WorkflowNode} from "@/components/workflow-node";

interface BaseExecitonNodeProps extends NodeProps {
  icon: LucideIcon | string
  name: string
  description?: string
  children?: ReactNode
  //status?:NodeStatus
  onSettings?: () => void
  onDoubleClick?: () => void
}

export const BaseExecutionNode = memo(({
                                         children,
                                         icon: Icon,
                                         description,
                                         onDoubleClick,
                                         onSettings,
                                         id,
                                         name,
                                         type
                                       }: BaseExecitonNodeProps) => {
// TODO: Add delete
  const handleDelete = () => {

  }
  return <WorkflowNode
      name={name}
      description={description}
      onDelete={handleDelete}
      onSettings={onSettings}
  >
    {/* TODO : Wrap within NodeStatus */}
    <BaseNode onDoubleClick={onDoubleClick}>
      <BaseNodeContent>
        {typeof Icon === "string" ? (
            <Image src={Icon} alt="Icon icon"
                   width={16} height={16}
            />
        ) : (<Icon/>)}
        {children}
        <BaseHandle type={"target"} id={"target-1"} position={Position.Left}/>
        <BaseHandle type={"source"} id={"source-1"} position={Position.Right}/>
      </BaseNodeContent>
    </BaseNode>
  </WorkflowNode>
})

BaseExecutionNode.displayName = "BaseExecutionNode"