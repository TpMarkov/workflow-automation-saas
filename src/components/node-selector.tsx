import {createId} from "@paralleldrive/cuid2"
import {useReactFlow} from "@xyflow/react"
import {GlobeIcon, MousePointerIcon} from "lucide-react"
import {useCallback} from "react"
import {toast} from "sonner"
import {
  Sheet,
  SheetHeader,
  SheetClose,
  SheetTitle,
  SheetFooter,
  SheetContent,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet"
import {NodeType} from "@/generated/prisma/enums"
import {Separator} from "@/components/ui/separator"
import Image from "next/image";

export type NodeTypeOptions = {
  type: NodeType
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }> | string
}

const triggerNodes: NodeTypeOptions[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Trigger Manually",
    description: "Runs the flow on clicking a button. Good for getting started quickly",
    icon: MousePointerIcon
  }
]

const executionNodes: NodeTypeOptions[] = [{
  type: NodeType.HTTP_REQUEST,
  label: "HTTP Request",
  description: "Makes a HTTP Request",
  icon: GlobeIcon
}]

interface NodeSelectorProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  children: React.ReactNode,
}

export function NodeSelector({children, open, onOpenChange}: NodeSelectorProps) {


  return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side={"right"} className={"w-full sm:max-w-md overflow-y-auto"}>
          <SheetHeader>
            <SheetTitle>
              What triggers this workflow?
            </SheetTitle>
            <SheetDescription>
              A trigger is a step that starts your workflow.
            </SheetDescription>
          </SheetHeader>
          <div>{triggerNodes.map((nodeType) => {
                const Icon = nodeType.icon
                return <div
                    className={"w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"}
                    key={nodeType.type}
                    onClick={() => {
                    }}
                >
                  <div className={"flex items-center gap-6 w-full"}>
                   {typeof Icon === "string" ? (
                       <Image
                           src={Icon}
                           alt={nodeType.label}
                           className="size-5 object-contain rounded-sm"
                       />
                   ) : (
                       <Icon className="size-5"/>
                   )}

                     <p>{nodeType.description}</p>
                  </div>

                </div>
              }
          )}</div>

        </SheetContent>
      </Sheet>
  )
}