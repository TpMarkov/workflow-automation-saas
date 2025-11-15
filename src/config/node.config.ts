import {NodeType} from "@/generated/prisma/enums";
import type {NodeTypes} from "@xyflow/react";
import {InitialNode} from "@/components/initial-node"
import {HttpRequestNode} from "@/features/executions/components/http-requests/node";

export const nodeComponents = {
  [NodeType.INITIAl]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  // [NodeType.MANUAL_TRIGGER]: ManualTriggerNode
} as const satisfies NodeTypes

export type RegisteredNodeType = keyof typeof nodeComponents