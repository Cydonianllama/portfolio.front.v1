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
import { useFlosStateMachineHookActions } from "../hooks/hook.state.machine";
import { userEdgeActions } from "../hooks/useEdgeActions";

export function DefaultEdge(props: EdgeProps) {
  const { removeConection } = userEdgeActions()
  const { canMoveNodes } = useFlosStateMachineHookActions({})
  const [path, labelX, labelY] = getBezierPath(props);
  return (<>
    <BaseEdge
      path={path}
      style={{
        stroke: "#c9c9c9",
        strokeWidth: 3,
        zIndex: 10001
      }}
    />

    {canMoveNodes && (
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
          className={"z-100 nodrag nopan border p-1 rounded-lg text-[12px] bg-white hover:bg-gray-100 "}
          onClick={() => {
            removeConection(props.source, props.sourceHandleId || null)
            // console.log(props.sourceHandleId)
            // if (props.sourceHandleId) {}
            //setEdges((es) => es.filter((e) => e.id !== id)); // esto es eliminacion directa
          }}
        >
          <MdDeleteOutline className='text-gray-400 dark:text-zinc-500 hover:text-red-500' />
        </Button>
      </EdgeLabelRenderer>

    )}

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