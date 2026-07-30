import { UseAppData } from "@/hooks/app/useAppData";
import { buttonItemSendMessageConfigNode } from "@erick/conversationalflow";

import {
  Handle,
  Position,
} from "@xyflow/react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ButtonItemProps = {
  data: buttonItemSendMessageConfigNode
  index: number
}

export const ButtonItem = ({ data }: ButtonItemProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <div className="p-1 border rounded w-full relative">
        {data.text}
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: 12,
            height: 12,
            background: "#2563eb",
            border: "2px solid white",
            borderRadius: "50%",
          }}
        />
      </div>
    </>
  )
}