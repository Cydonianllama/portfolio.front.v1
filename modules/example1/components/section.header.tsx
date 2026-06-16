// components
import { Button } from '@/components/ui/button'

// state
import { useManagerv1Store } from './store';

export const SectionHeader = () => {

  const moduleState = useManagerv1Store();

  const HandleToOpenAddItem = () => {
    moduleState.setOpenCreateItem(true)
  }

  return (<>
    <div className="flex justify-between items-center py-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-700">Administracion de usuarios</h1>
        <p className="text-md text-gray-400">Pantalla de administración de usuarios</p>
      </div>
      <div>
        <Button onClick={HandleToOpenAddItem}>Agregar usuario</Button>
      </div>
    </div>
  </>)
}