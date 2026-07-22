import {
  BaseEdge,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath, // tipo n8n
  getSimpleBezierPath,

} from "@xyflow/react";

export function DefaultEdge(props: EdgeProps) {
  const [path] = getStraightPath(props);
  return (<>
    <BaseEdge
      path={path}
      style={{
        stroke: "#2563eb",
        strokeWidth: 3,
      }}
    />

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