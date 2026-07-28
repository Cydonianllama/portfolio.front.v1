export const ColorsSelect: Array<{ color: string, value: string }> = [
  { color: 'Rojo', value: 'red' },
  { color: 'Verde', value: 'green' },
  { color: 'Azul', value: 'blue' },
  { color: 'Negro', value: 'black' },
]

import { EntityFieldType } from '@erick/dataengine'

export const TypesFieldSelect: Array<{ label: string, value: string }> = [
  { label: 'String', value: EntityFieldType.string },
  { label: 'Number', value: EntityFieldType.number },
]