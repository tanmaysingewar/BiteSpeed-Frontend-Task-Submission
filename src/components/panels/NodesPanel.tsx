"use client";

import React from "react";
import { Mail, MessageCircle } from "lucide-react";

interface NodeType {
  id: string;
  type: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
}

// Extensible node types - new node types can be easily added here
const nodeTypes: NodeType[] = [
  {
    id: "message_1",
    type: "textNode1",
    label: "Message One",
    icon: MessageCircle,
    description: "Send a text message",
  },
  {
    id: "message_2",
    type: "textNode2",
    label: "Message Two",
    icon: MessageCircle,
    description: "Send a text message",
  },
  {
    id: "send_email",
    type: "emailNode1",
    label: "Email One",
    icon: Mail,
    description: "Send an email",
  },
];

const NodesPanel = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    console.log("nodeType", nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-1/4 bg-neutral-50 border-l border-gray-200 p-4 dark:bg-neutral-900 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Nodes
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Drag and drop nodes to the canvas
      </p>

      <div className="space-y-2">
        {nodeTypes.map((nodeType) => {
          const IconComponent = nodeType.icon;

          return (
            <div
              key={nodeType.id}
              draggable
              onDragStart={(event) => onDragStart(event, nodeType.type)}
              className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg cursor-grab hover:bg-blue-100 transition-colors duration-200 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700"
            >
              <IconComponent size={20} className="text-amber-600" />
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {nodeType.label}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {nodeType.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NodesPanel;
