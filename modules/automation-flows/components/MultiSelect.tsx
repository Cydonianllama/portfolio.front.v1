import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { TagDTO } from "@/api/tags/tags.dto"

type MultiSelectProps = {
  options: Array<TagDTO>
  selected: Array<string>
  onChange: (ids: Array<string>) => void
  placeholder?: string
}

export function MultiSelect({ options, selected, onChange, placeholder = 'Selecciona...' }: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const HandleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(el => el != id))
    } else {
      onChange([...selected, id])
    }
  }

  const selectedNames = options.filter(el => selected.includes(el.id)).map(el => el.name)

  return (
    <div className="relative">
      <Button
        type="button"
        variant={'outline'}
        className="w-full justify-between text-xs font-normal"
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">
          {selectedNames.length ? selectedNames.join(', ') : placeholder}
        </span>
        <ChevronDown className="size-3.5 shrink-0" />
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border bg-popover p-1 shadow-md">
            {options.length ? (
              options.map((el) => {
                const isChecked = selected.includes(el.id)
                return (
                  <label
                    key={el.id}
                    className="flex items-center gap-2 px-2 py-1.5 text-xs cursor-pointer hover:bg-accent rounded"
                  >
                    <input
                      type="checkbox"
                      className="size-3.5 accent-primary"
                      checked={isChecked}
                      onChange={() => HandleToggle(el.id)}
                    />
                    <span className="truncate">{el.name}</span>
                  </label>
                )
              })
            ) : (
              <div className="px-2 py-1.5 text-xs text-muted-foreground">Sin opciones</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
