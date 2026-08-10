import { TemplateItem, templateItemData } from "./templateItem"

/* eslint-disable @typescript-eslint/no-empty-object-type */
type TemplateSectionProps = {
  title?: string
  templates: Array<templateItemData>
}

export function TemplateSection({ templates, title = 'Comienza con nuestros templates' }: TemplateSectionProps) {
  return (<>
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold text-foreground">{title}</div>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((el, index) => (
          <TemplateItem key={index} data={el} />
        ))}
      </div>
    </div>
  </>)
}