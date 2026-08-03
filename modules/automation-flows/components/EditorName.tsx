import { automationFlowGenStore } from "../store/automation.flow.store";
import { useAutomationName } from "../hooks/useAutomationName";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type EditorNameProps = {
  
}

export const EditorName = ({  }: EditorNameProps) => {
  const automationFlowStore = automationFlowGenStore()
  const { editing, value, setValue, StartEdit, CancelEdit, SaveEdit } = useAutomationName()

  const currentAutomation = automationFlowStore.information?.automation

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <Input
          className="h-7 text-sm font-semibold w-56"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == 'Enter') SaveEdit()
            if (e.key == 'Escape') CancelEdit()
          }}
        />
        <Button variant={'ghost'} size={'icon-xs'} onClick={SaveEdit}>
          <Check className="size-3.5" />
        </Button>
        <Button variant={'ghost'} size={'icon-xs'} onClick={CancelEdit}>
          <X className="size-3.5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 group">
      <div className="font-semibold text-sm truncate max-w-56">
        {currentAutomation?.title || 'Sin título'}
      </div>
      <Button variant={'ghost'} size={'icon-xs'} onClick={StartEdit} title="Renombrar automatización">
        <Pencil className="size-3.5" />
      </Button>
    </div>
  )
}
