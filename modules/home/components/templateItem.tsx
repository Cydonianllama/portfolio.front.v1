/* eslint-disable @typescript-eslint/no-empty-object-type */

export type templateItemData = {
  title: string,
  tags: Array<string>
}

export type TemplateItemProps = {
  data: templateItemData
}

export function TemplateItem({ data } : TemplateItemProps){
  return(<>
    <div className="p-2 border rounded flex flex-col gap-2 select-none cursor-pointer hover:outline-blue-500 hover:outline-2 transition-colors">
      <h2 className="text-foreground font-semibold">{data.title}</h2>
      <div className="flex gap-1">
        {data.tags.map((el, index) => <div className="p-0.5 border rounded text-xs text-muted-foreground" key={index}>{el}</div>)}
      </div>
    </div>
  </>)
}