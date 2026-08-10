import { ItemAsideContact, ItemAsideContactData } from "./itemAsideContact";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type SectionAsideContactsProps = {
  title: string;
  titleQty?: string
  onClickElement: (code: string) => void
  items: ItemAsideContactData[]
}

export function SectionAsideContacts({ items, onClickElement, title, titleQty = 'Contactos' }: SectionAsideContactsProps) {
  return (<>
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-foreground text-sm">{title}</span>
        <span className="text-sm text-muted-foreground">{titleQty}</span>
      </div>
      <div>
        {items.map(el => (
          <ItemAsideContact key={el.code} data={el} onClick={onClickElement} />
        ))}
      </div>
    </div>
  </>)
}