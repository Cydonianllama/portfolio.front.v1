type colorsSelector = {
  name: string,
  code: string,
  classname: string
}

export const ColorsSelector: Array<colorsSelector> = [
  {
    code: 'color::default',
    name: 'Default',
    classname: 'bg-gray-500'
  },
  {
    code: 'color::green',
    name: 'Verde',
    classname: 'bg-green-500'
  },
  {
    code: 'color::red',
    name: 'Rojo',
    classname: 'bg-red-500'
  },
  {
    code: 'color::blue',
    name: 'Azul',
    classname: 'bg-blue-500'
  },
  {
    code: 'color::yellow',
    name: 'Amarillo',
    classname: 'bg-yellow-500'
  },
]