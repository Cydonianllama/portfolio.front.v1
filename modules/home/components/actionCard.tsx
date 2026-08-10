/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-empty-object-type */
export type ActionCardData = {
  title: string,
  goto: string,
  description: string
  urlImage: string
}

type ActionCardProps = {
  data: ActionCardData
}

export function ActionCard({ data } : ActionCardProps){
  return(<>
    <div className="flex flex-col gap-2">
      <div>
        <img className="w-120 h-50 object-cover rounded" src={data.urlImage} alt="action card image" />
      </div>
      <div className="text-foreground text-lg font-semibold">
        {data.title}
      </div>
      <div className="text-sm text-muted-foreground">
        {data.description}
      </div>
    </div>
  </>)
}