"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Node } from "@xyflow/react";
import { TextNodeData } from "../nodes/TextNodeOne";

interface SettingsPanelProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: Partial<TextNodeData>) => void;
  onDeselect: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onUpdateNode,
  onDeselect,
}) => {
  if (!selectedNode) {
    return null;
  }

  const nodeData = selectedNode.data as TextNodeData;

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newMessage = event.target.value;
    onUpdateNode(selectedNode.id, { message: newMessage });
  };

  return (
    <div className="w-1/4 bg-white border-r border-gray-200 p-4 dark:bg-neutral-900 dark:border-gray-700">
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onDeselect}
          className="p-1 hover:bg-gray-100 rounded transition-colors dark:hover:bg-neutral-800"
          title="Back to nodes panel"
        >
          <ArrowLeft size={16} className="text-gray-600 dark:text-gray-400 " />
        </button>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {selectedNode.type === "textNode1"
            ? "Message One"
            : selectedNode.type === "textNode2"
            ? "Message Two"
            : "Email One"}
        </h3>
      </div>

      {/* Settings form */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="message-text"
            className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-200"
          >
            Text
          </label>
          <textarea
            id="message-text"
            value={nodeData.message || ""}
            onChange={handleMessageChange}
            placeholder={
              selectedNode.type === "textNode1"
                ? "Enter your message..."
                : selectedNode.type === "textNode2"
                ? "Enter your message..."
                : "Enter your email..."
            }
            className="w-full p-2 border border-gray-300 rounded-md resize-y outline-none"
            rows={4}
          />
        </div>

        {/* Future settings can be added here */}
        <div className="text-xs text-gray-500">Node ID: {selectedNode.id}</div>
      </div>
    </div>
  );
};

export default SettingsPanel;
