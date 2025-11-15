"use client";

import {Node, NodeProps} from "@xyflow/react";
import {GlobeIcon} from "lucide-react";
import {memo} from "react";
import {BaseExecutionNode} from "@/components/base-execution-node";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo(
    (props: NodeProps<HttpRequestNodeType>) => {
      const nodeData = props.data;
      const description = nodeData?.endpoint
          ? `${nodeData.method || "GET"} : ${nodeData.endpoint}`
          : "Not configured";

      return (
          <BaseExecutionNode
              {...props}
              id={props.id}
              name="HTTP Request"
              icon={GlobeIcon}
              description={description}
              isConnectable={true}
          />
      );
    }
);

HttpRequestNode.displayName = "HttpRequestNode";
