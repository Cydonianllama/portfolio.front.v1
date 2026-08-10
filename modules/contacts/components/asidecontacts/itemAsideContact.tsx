/* eslint-disable @typescript-eslint/no-empty-object-type */

export type ItemAsideContactData = {
  title: string,
  code: string
  qty?: number,
}

export type ItemAsideContactProps = {
  data: ItemAsideContactData
  onClick: (code: string) => void
}

export function ItemAsideContact({ data, onClick } : ItemAsideContactProps){
  return(<>
    <div className="flex gap-1 items-center justify-between rounded py-1.5 w-full  text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => { onClick(data.code) }}>
      {data.title}
      <span>
        {data.qty || 0}
      </span>
    </div>
  </>)
}