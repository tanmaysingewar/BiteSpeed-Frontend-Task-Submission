# BiteSpeed: Frontend Task Submission

A modern, extensible chatbot flow builder built with React Flow, Next.js, and TypeScript. This application allows users to create conversational flows by connecting message nodes through a drag-and-drop interface.

## 🚀 Features

### ✅ Core Functionality

- **Text Nodes**: Create message nodes with customizable text content
- **Drag & Drop**: Intuitive node placement from the nodes panel to canvas
- **Visual Connections**: Connect nodes with edges to define conversation flow
- **Node Selection**: Click nodes to edit their properties in the settings panel
- **Flow Validation**: Built-in validation ensures proper flow structure before saving

### 🎯 Key Requirements Met

1. **Single Source Handle**: Each node can only have one outgoing connection
2. **Multiple Target Handles**: Nodes can receive multiple incoming connections
3. **Settings Panel**: Dynamically replaces nodes panel when a node is selected
4. **Save Validation**: Prevents saving if more than one node has empty target handles
5. **Extensible Architecture**: Easy to add new node types in the future

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: Bun (package manager and runtime)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Flow Builder**: React Flow (@xyflow/react)
- **Icons**: Lucide React
- **ID Generation**: UUID

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd BitSpeed
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start the development server**

   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── FlowCanvas.tsx       # Main flow builder component
│   ├── nodes/
│   │   └── TextNode.tsx     # Custom text message node
│   └── panels/
│       ├── NodesPanel.tsx   # Draggable nodes panel
│       └── SettingsPanel.tsx # Node settings editor
```

## 🎮 How to Use

### Creating Nodes

1. **Drag** a "Message" node from the left panel
2. **Drop** it onto the canvas
3. **Click** the node to edit its message in the settings panel

### Connecting Nodes

1. **Drag** from a node's right handle (source)
2. **Drop** onto another node's left handle (target)
3. **Note**: Each source handle can only have one connection

### Editing Nodes

1. **Click** on any node to select it
2. **Edit** the message text in the settings panel that appears
3. **Use** the back arrow to return to the nodes panel

### Saving Flows

1. **Click** the "Save Changes" button in the top-right
2. **Validation** ensures no orphaned nodes (except one starting node)
3. **Success** message confirms the flow was saved

## 🔧 Customization

### Adding New Node Types

The architecture is designed to be extensible. To add a new node type:

1. **Create the node component** in `src/components/nodes/`

   ```typescript
   // Example: QuestionNode.tsx
   export const QuestionNode: React.FC<NodeProps> = ({ data, selected }) => {
     // Node implementation
   };
   ```

2. **Add to node types** in `NodesPanel.tsx`

   ```typescript
   const nodeTypes: NodeType[] = [
     // ... existing nodes
     {
       id: "question",
       type: "questionNode",
       label: "Question",
       icon: HelpCircle,
       description: "Ask a question with multiple choice answers",
     },
   ];
   ```

3. **Register in React Flow** in `FlowCanvas.tsx`
   ```typescript
   const nodeTypes = {
     textNode: TextNode,
     questionNode: QuestionNode, // Add new node type
   };
   ```

### Styling Customization

The project uses Tailwind CSS for styling. Key design elements:

- **Color Scheme**: Blue primary with teal accents
- **Layout**: Sidebar + main canvas layout
- **Responsive**: Mobile-friendly design
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🧪 Validation Logic

The flow builder implements smart validation:

```typescript
// Save validation rules:
if (nodes.length > 1) {
  const nodesWithoutIncomingEdges = nodes.filter(
    (node) => !edges.some((edge) => edge.target === node.id)
  );

  if (nodesWithoutIncomingEdges.length > 1) {
    // Error: Cannot save flow
  }
}
```

## 🔄 Flow Features

### Connection Rules

- **Source Handles**: Limited to one outgoing edge
- **Target Handles**: Allow multiple incoming edges
- **Auto-replacement**: New connections replace existing ones from the same source

### Node Management

- **Unique IDs**: Each node gets a UUID for tracking
- **Live Updates**: Settings panel changes reflect immediately
- **State Persistence**: Node data persists during editing sessions

## 🚀 Performance Optimizations

- **React.useCallback**: Optimized event handlers prevent unnecessary re-renders
- **Efficient State Updates**: Minimal state changes for better performance
- **Lazy Loading**: Components load only when needed

## 🛡️ Error Handling

- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Validation Feedback**: Clear error messages for invalid flows
- **Graceful Degradation**: App continues working even with minor issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) for the excellent flow building library
- [Next.js](https://nextjs.org/) for the robust React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icon set
