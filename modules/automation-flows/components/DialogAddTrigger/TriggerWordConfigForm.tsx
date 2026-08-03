import { TriggerCriteria } from "@erick/conversationalflow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconsCatalog } from "@/catalogs/icons.catalogs"
import { useState } from "react"

export const TriggerCriteriaOptions: Record<TriggerCriteria, string> = {
  [TriggerCriteria.is]: 'El mensaje es',
  [TriggerCriteria.contains]: 'El mensaje contiene',
  [TriggerCriteria.notContains]: 'El mensaje no contiene',
  [TriggerCriteria.startsWith]: 'El mensaje empieza con',
}

export type TriggerWordConfig = {
  criteria: TriggerCriteria
  words: Array<string>
}

type TriggerWordConfigFormProps = {
  onSave: (config: TriggerWordConfig) => void
  onCancel: () => void
}

export function TriggerWordConfigForm({ onSave, onCancel }: TriggerWordConfigFormProps) {
  const [criteria, setCriteria] = useState<TriggerCriteria>(TriggerCriteria.contains)
  const [words, setWords] = useState<Array<string>>([''])

  const HandleUpdateWord = (index: number, value: string) => {
    const next = [...words]
    next[index] = value
    setWords(next)
  }

  const HandleAddWord = () => {
    setWords([...words, ''])
  }

  const HandleRemoveWord = (index: number) => {
    if (words.length == 1) {
      setWords([''])
      return
    }
    setWords(words.filter((_, i) => i != index))
  }

  const HandleSave = () => {
    const cleanWords = words.map((el) => el.trim()).filter((el) => el.length > 0)
    if (cleanWords.length == 0) return
    onSave({ criteria, words: cleanWords })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Condición</Label>
        <Select value={String(criteria)} onValueChange={(val) => setCriteria(Number(val) as TriggerCriteria)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(TriggerCriteriaOptions).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>Palabras</Label>
        <div className="space-y-1.5">
          {words.map((word, index) => (
            <div key={index} className="flex gap-1.5">
              <Input
                value={word}
                placeholder="Escribe una palabra..."
                onChange={(e) => HandleUpdateWord(index, e.target.value)}
              />
              <Button variant={'outline'} size={'icon-sm'} onClick={() => HandleRemoveWord(index)}>
                {IconsCatalog.removex.Icon}
              </Button>
            </div>
          ))}
        </div>
        <Button variant={'outline'} size={'sm'} onClick={HandleAddWord} className="w-full">
          {IconsCatalog.addPlus.Icon} Agregar palabra
        </Button>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant={'outline'} onClick={onCancel}>Volver</Button>
        <Button onClick={HandleSave}>Guardar</Button>
      </div>
    </div>
  )
}
