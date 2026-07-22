import {
  NodeProps,
  Handle,
  Position,
  NodeResizer,
} from "@xyflow/react";

export function MessageNode({ data }: NodeProps) {
  return (
    <>
      <NodeResizer minWidth={180} minHeight={100} />
      <Handle
        type="target"
        position={Position.Left}
      />
      <div
        style={{
          border: "1px solid #555",
          borderRadius: 10,
          background: "#fff",
          width: "100%",
          height: "100%",
          padding: 12,
        }}
      >
        <strong>
          {/* {data?.title || ''} */}
          Message node
        </strong>
        <p>Contenido del mensaje</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
      />
    </>
  );
}