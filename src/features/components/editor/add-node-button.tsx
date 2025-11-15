"use client"
import React from 'react'
import {Button} from "@/components/ui/button"

import {memo} from "react";

import {PlusIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {NodeSelector} from "@/components/node-selector";
import {useState} from "react";

export const AddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false)
  return (
      <NodeSelector
          open={selectorOpen}
          onOpenChange={setSelectorOpen}>

        <Button
            onClick={() => {
            }}
            size={"icon"}
            variant={"outline"}
            className={"bg-background"}
        >
          < PlusIcon
              className={"size-4"}
          />
        </Button>
      </NodeSelector>
  )
})

AddNodeButton.displayName = "AddNodeButton"