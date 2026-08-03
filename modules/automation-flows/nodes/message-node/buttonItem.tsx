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

  const connected = Boolean(data?.nextNode)

  return (
    <>
      <div className={`p-1 border rounded w-full relative flex items-center gap-1.5 ${connected ? 'border-green-400 bg-green-50/50' : 'border-dashed border-gray-300'}`}>
        {/* <span
          className={`h-2 w-2 rounded-full shrink-0 ${connected ? 'bg-green-500' : 'bg-amber-400'}`}
          title={connected ? 'Conectado' : 'Sin conexión'}
        /> */}
        <span className="truncate flex-1">{data.text}</span>
        <Handle
          id={data?.id}
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