import { CatalogTrigger } from "../../catalogs/catalogTriggers"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type AddTriggerOptionProps = {
  data: CatalogTrigger
  onClick: (data: CatalogTrigger) => void
}

export function AddTriggerOption({ data, onClick } : AddTriggerOptionProps){
  return(<>
    <div onClick={() => { onClick(data) }} className="flex gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg border">
      <div>
        <div className="h-12 w-12 rounded-lg border flex items-center justify-center">{data.Icon}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-foreground font-semibold">{data.title}</div>
        <div className="text-muted-foreground">{data.description}</div>
      </div>
    </div>
  </>)
}