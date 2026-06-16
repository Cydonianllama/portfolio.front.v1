/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react';

export type InputSearchTableType = {
  placeholder: string
  onSearch: (query: string) => void;
  timeout: number
}

export const InputSearchTable = (config: InputSearchTableType) => {

  const [id, setId] = useState<any>('')
  const [inputText, setInputText] = useState('')

  const OnChangeInput = (text: string) => {
    // limpiar timeout
    clearTimeout(id)
    setInputText(text)

    // volver a esperar que no escriba para mandar a actualizar
    const newId = setTimeout(() => {
      config.onSearch(text)
    }, config.timeout)

    setId(newId)
  }

  useEffect(() => {
    return () => {
      if (id){
        clearTimeout(id)
      }
    };
  }, [])

  return (<>
    <Input 
      value={inputText}
      onChange={(e) => OnChangeInput(e.target.value)}
      placeholder={config.placeholder}
    />
  </>)
}