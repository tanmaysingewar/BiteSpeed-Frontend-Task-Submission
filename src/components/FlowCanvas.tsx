"use client";

import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  ConnectionMode,
  BackgroundVariant,
} from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

// Import custom components
import TextNodeOne, {
  TextNodeData as TextNodeOneData,
} from "./nodes/TextNodeOne";
import TextNodeTwo, {
  TextNodeData as TextNodeTwoData,
} from "./nodes/TextNodeTwo";
import EmailNodeOne, {
  TextNodeData as EmailNodeOneData,
} from "./nodes/EmailNodeOne";

import NodesPanel from "./panels/NodesPanel";
import SettingsPanel from "./panels/SettingsPanel";

import "@xyflow/react/dist/style.css";
import { toast } from "sonner";

// Define custom node types for React Flow
const nodeTypes = {
  textNode1: TextNodeOne,
  textNode2: TextNodeTwo,
  emailNode1: EmailNodeOne,
};

// Initial nodes and edges
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const FlowCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [saveError, setSaveError] = useState<string>("");

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle canvas click (deselect nodes)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle drag and drop from nodes panel
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: { message: "" },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Update node data
  const onUpdateNode = useCallback(
    (
      nodeId: string,
      data: Partial<TextNodeOneData | TextNodeTwoData | EmailNodeOneData>
    ) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, ...data },
            };
          }
          return node;
        })
      );

      // Update selected node if it's the same node being updated
      if (selectedNode && selectedNode.id === nodeId) {
        setSelectedNode((prev) =>
          prev ? { ...prev, data: { ...prev.data, ...data } } : null
        );
      }
    },
    [setNodes, selectedNode]
  );

  // Validate and save flow
  const onSave = useCallback(() => {
    setSaveError("");

    if (nodes.length > 1) {
      // Check if more than one node has empty target handles
      const nodesWithoutIncomingEdges = nodes.filter((node) => {
        return !edges.some((edge) => edge.target === node.id);
      });

      if (nodesWithoutIncomingEdges.length > 1) {
        setSaveError("Cannot save Flow");
        return;
      }
    }

    // If validation passes, save the flow
    toast.info("Flow saved successfully!");
  }, [nodes, edges]);

  // Deselect node
  const onDeselect = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="h-screen flex">
      {/* Main Flow Area */}
      <div className="flex-1 relative">
        {/* Header with Save Button */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
          {saveError && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-sm">
              {saveError}
            </div>
          )}
          <button
            onClick={onSave}
            className="bg-white hover:bg-neutral-300 text-black px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>

        {/* React Flow Canvas */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Strict}
          fitView
          className="dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
        >
          <Background variant={BackgroundVariant.Dots} />
          <Controls className="text-black" />
        </ReactFlow>
      </div>
      {/* Side Panel - Shows either Nodes Panel or Settings Panel */}
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onUpdateNode={onUpdateNode}
          onDeselect={onDeselect}
        />
      ) : (
        <NodesPanel />
      )}
    </div>
  );
};

export default FlowCanvas;
