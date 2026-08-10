import { SectionAsideContacts } from "./sectionAsideContact"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type AsideContactsProps = {

}

export function AsideContacts({ }: AsideContactsProps) {
  return (<>
    <div className="h-full w-full pl-3 pr-2">
      <SectionAsideContacts
        items={[
          { code: 'etiqu-1', title: 'etiqueta 1', qty: 1510 },
          { code: 'etiqu-2', title: 'etiqueta 2', qty: 700 },
          { code: 'etiqu-3', title: 'etiqueta 3', qty: 669 },
          { code: 'etiqu-4', title: 'etiqueta 4', qty: 520 },
          { code: 'etiqu-5', title: 'etiqueta 5', qty: 122 },
        ]}
        onClickElement={() => { }}
        title="Etiquetas"
      />
    </div>
  </>)
}