/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export type TextareaAutomation = {
  value: string
  onUpdate: (val: string) => void
}

export function TextareaAutomation({ value: initialValue, onUpdate } : TextareaAutomation){

  const [value, setvalue] = useState<string>(initialValue)
  const [id, setId] = useState<any>(null)

  const HandleUpdate = (value: string) => {
    if (id) clearTimeout(id)
    setvalue(value)
    const newId = setTimeout(() => {
      onUpdate(value)
    }, 600)
    setId(newId)
  }

  return(<>
    <Textarea value={value} onChange={(e) => HandleUpdate(e.target.value)}></Textarea>
  </>)
}