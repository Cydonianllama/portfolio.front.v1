import { useCallback } from "react"
import { toast } from "sonner"
import { TestIntegrateOne, TestIntegrateOneRequestDTO } from "./service.test.integrate"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type IntegrationHookActionsProps = {

}

export const UseIntegrationHookActions = ({ }: IntegrationHookActionsProps) => {

  const AddIngrationTestAction = useCallback(async (data: TestIntegrateOneRequestDTO) => {
    try {
      const req = await TestIntegrateOne(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }

      // success
      toast.success('Agregado integracion de test exitosamente')

    } catch (ex) {

    } finally {

    }
  }, [])

  return {
    AddIngrationTestAction
  }
}