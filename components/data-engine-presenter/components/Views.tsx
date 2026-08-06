import type { ViewPresenterItem } from "..";
import { ViewItem } from "./ViewItem";

type ViewProps = {
  views: ViewPresenterItem[]
}

export function View(data: ViewProps) {
  return (<>
    <div className="flex gap-2 items-center">
      {data.views.map((el, index) => (
        <ViewItem onPressed={() => {}} data={el} key={index} />
      ))}
    </div>
  </>)
}