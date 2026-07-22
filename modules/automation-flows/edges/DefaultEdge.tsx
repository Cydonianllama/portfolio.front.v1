import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath, // tipo n8n
  getSimpleBezierPath,
  EdgeLabelRenderer,

} from "@xyflow/react";
import { MdDeleteOutline } from "react-icons/md";

export function DefaultEdge(props: EdgeProps) {
  const [path, labelX, labelY] = getBezierPath(props);
  return (<>
    <BaseEdge
      path={path}
      style={{
        stroke: "#2563eb",
        strokeWidth: 3,
      }}
    />

    <EdgeLabelRenderer>
      <Button
        variant={'outline'}
        size={'icon'}
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          pointerEvents: 'all',
          // zIndex: 10001
        }}
        className={"nodrag nopan border p-1 rounded-lg text-[12px] bg-white hover:bg-gray-100 "}
        onClick={() => {
          // setEdges((es) => es.filter((e) => e.id !== id)); -- esto es eliminacion directa
        }}
      >
        <MdDeleteOutline className='text-gray-400 dark:text-zinc-500 hover:text-red-500' />
      </Button>
    </EdgeLabelRenderer>

    {/* <path
      d={path}
      stroke="#6366f1"
      strokeWidth={4}
      fill="none"
      strokeDasharray="8 4"
    />

    <circle
      cx={props.targetX}
      cy={props.targetY}
      r={5}
      fill="#6366f1"
    /> */}
  </>);
}