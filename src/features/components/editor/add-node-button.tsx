"use client"
import React from 'react'
import {Button} from "@/components/ui/button"

import {memo} from "react";

import {PlusIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

export const AddNodeButton = memo(() => {
  return (
      <Tooltip>
        <TooltipTrigger>
          <TooltipContent align={"start"} side={"left"}>
            Add new Node
          </TooltipContent>
          <Button onClick={() => {
          }}
                  size={"icon"}
                  variant={"outline"}
                  className={"bg-background"}
          >
            <PlusIcon className={"size-4"}/>
          </Button>
        </TooltipTrigger>
      </Tooltip>
  )
})

AddNodeButton.displayName = "AddNodeButton"