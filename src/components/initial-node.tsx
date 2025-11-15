"use client"
import type {NodeProps} from "@xyflow/react";
import {PlusIcon} from "lucide-react"
import {memo, useState} from "react";
import {PlaceholderNode, PlaceholderNodeProps} from "@/components/react-flow/placeholder-node";


import React from 'react'
import {WorkflowNode} from "@/components/workflow-node";


export const InitialNode = memo((props: NodeProps) => {


  return (
      <WorkflowNode name={"Node"}
                    showToolbar={true}
                    description={"Click to add a Node"}

      >
        <PlaceholderNode
            {...props}
            onClick={() => {
            }}
        >
          <div className={"cursor-pointer flex items-center justify-center"}>
            <PlusIcon className={"size-4"}/>
          </div>
        </PlaceholderNode>
      </WorkflowNode>
  )
})

InitialNode.displayName = "InitialNode"