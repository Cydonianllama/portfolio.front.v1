"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { catalogEntityIcons } from "../../catalog/icons.catalog"

type IconSelectorProps = {
  value: string
  onChange: (code: string) => void
  placeholder?: string
}

export const IconSelector = ({ value, onChange, placeholder = 'Seleccionar icono' }: IconSelectorProps) => {
  const [open, setOpen] = useState(false)
  const selected = catalogEntityIcons.find(el => el.code == value)

  const HandleSelect = (code: string) => {
    onChange(code)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger render={<Button variant="outline" className="gap-2">
        {selected ? (<>
          {selected.Icon}
          <span>{selected.code}</span>
        </>) : (<>
          {placeholder}
        </>)}
      </Button>} />
      <DropdownMenuContent className="w-52">
        {/* <DropdownMenuLabel>Seleccionar icono</DropdownMenuLabel> */}
        <div className="grid grid-cols-4 gap-1 p-2">
          {catalogEntityIcons.map((el, index) => (
            <button
              key={index}
              type="button"
              title={el.code}
              onClick={() => HandleSelect(el.code)}
              className={`flex h-10 w-10 items-center justify-center rounded-md border text-lg transition-colors ${value == el.code ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted'}`}
            >
              {el.Icon}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
