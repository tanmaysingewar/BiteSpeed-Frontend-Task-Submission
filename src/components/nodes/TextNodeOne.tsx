"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import { MessageCircle } from "lucide-react";

export interface TextNodeData {
  message?: string;
}

const TextNodeOne = ({
  data,
  selected,
}: {
  data: TextNodeData;
  selected: boolean;
}) => {
  const nodeData = (data || {}) as TextNodeData;

  return (
    <div
      className={`bg-white border-2 rounded-lg shadow-md min-w-[200px] ${
        selected ? "border-amber-500" : "border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="bg-amber-100 px-3 py-2 rounded-t-lg border-b border-gray-200 flex items-center gap-2">
        <MessageCircle size={16} className="text-amber-600" />
        <span className="text-sm font-medium text-gray-700">
          Send Message One
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="text-sm text-gray-600 whitespace-pre-wrap">
          {nodeData.message || "Enter your message..."}
        </div>
      </div>

      {/* Source Handle - Only one edge can originate from this */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ right: -6 }}
      />

      {/* Target Handle - Multiple edges can connect to this */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ left: -6 }}
      />
    </div>
  );
};

export default TextNodeOne;
