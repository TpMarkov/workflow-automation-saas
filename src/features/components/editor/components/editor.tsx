"use client"

import {useSuspenseWorkflow} from "@/features/workflows/hooks/use-workflows";
import {ErrorView, LoadingView} from "@/components/entity-components";

import {useState, useCallback} from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Edge,
  type Node,
  EdgeChange,
  Connection, MiniMap, ReactFlowProvider, Controls, Background, Panel
} from "@xyflow/react";

import "@xyflow/react/dist/style.css"
import {NodeChange} from "@xyflow/system";
import {nodeComponents} from "@/config/node.config";
import {AddNodeButton} from "@/features/components/editor/add-node-button";


type Props = {
  id: string
};


export const Editor = ({id}: Props) => {

  const {data: workflow} = useSuspenseWorkflow(id)

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes)
  const [edges, setEdges] = useState<Edge[]>(workflow.edges)

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)), [])

  const onEdesChange = useCallback((changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)), [])

  const onConnect = useCallback((params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)), [])

  return (
      <div className={"size-full"}>
        <ReactFlowProvider>
          <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdesChange}
              onConnect={onConnect}
              fitView
              proOptions={
                {hideAttribution: true}
              }
              nodeTypes={nodeComponents}
          >


            <Controls/>
            <Background/>
            <MiniMap/>
            <Panel position={"top-right"}>
              <AddNodeButton/>
            </Panel>
          </ReactFlow>
        </ReactFlowProvider>

      </div>
  )
};

export default Editor

export const EditorLoader = () => {
  return <LoadingView message={"Loading Editor..."}/>
}

export const EditorError = () => {
  return <ErrorView message={"Error loading Editor"}/>
}





