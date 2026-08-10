import { ActionCard, ActionCardData } from "./actionCard"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type ActionsSectionsProps = {
  title: string
  subtitle: string
  actions: Array<ActionCardData>
}

export function ActionsSections({ title, subtitle, actions }: ActionsSectionsProps) {
  return (<>
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {actions.map((el, index) => (
          <ActionCard key={index} data={el} />
        ))}
      </div>
    </div>
  </>)
}