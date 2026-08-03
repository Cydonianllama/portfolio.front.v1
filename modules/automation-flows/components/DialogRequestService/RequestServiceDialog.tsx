/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Button } from "@/components/ui/button"
import { IconsCatalog } from "@/catalogs/icons.catalogs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IAutomationNode, NODE_TYPE_REQUEST_SERVICE, NodeRequestServiceConfig } from "@erick/conversationalflow"
import { useAutomationEditor } from "../../hooks/useAutomationEditor"
import { useRequestServiceEditorActions } from "../../hooks/useRequestServiceEditorActions"
import { automationFlowGenStore } from "../../store/automation.flow.store"
import { useEffect, useState } from "react"

type RequestServiceDialogProps = {

}

const HTTP_METHODS: NodeRequestServiceConfig['method'][] = ['POST', 'GET', 'PUT', 'DELETE']

const defaultConfiguration: NodeRequestServiceConfig = {
  url: '',
  method: 'POST',
  headers: [],
  body: '',
  mappers: [],
}

export const RequestServiceDialog = ({ }: RequestServiceDialogProps) => {
  const automationFlowStore = automationFlowGenStore()

  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateRequestServiceConfiguration } = useRequestServiceEditorActions()

  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_REQUEST_SERVICE>;

  const [configuration, setConfiguration] = useState<NodeRequestServiceConfig>(defaultConfiguration)

  useEffect(() => {
    if (nodeInformation?.configuration) {
      setConfiguration({
        ...defaultConfiguration,
        ...nodeInformation.configuration,
        headers: nodeInformation.configuration?.headers ? [...nodeInformation.configuration.headers] : [],
        mappers: nodeInformation.configuration?.mappers ? [...nodeInformation.configuration.mappers] : [],
      })
    }
  }, [nodeInformation])

  const HandleToUpdateHeader = (index: number, field: 'key' | 'value', value: string) => {
    setConfiguration((prev) => ({
      ...prev,
      headers: prev.headers.map((el, idx) => idx === index ? { ...el, [field]: value } : el),
    }))
  }

  const HandleToAddHeader = () => {
    setConfiguration((prev) => ({
      ...prev,
      headers: [...prev.headers, { key: '', value: '' }],
    }))
  }

  const HandleToRemoveHeader = (index: number) => {
    setConfiguration((prev) => ({
      ...prev,
      headers: prev.headers.filter((_, idx) => idx !== index),
    }))
  }

  const HandleToUpdateMapper = (index: number, field: 'path' | 'saveId', value: string) => {
    setConfiguration((prev) => ({
      ...prev,
      mappers: prev.mappers.map((el, idx) => idx === index ? { ...el, [field]: value } : el),
    }))
  }

  const HandleToAddMapper = () => {
    setConfiguration((prev) => ({
      ...prev,
      mappers: [...prev.mappers, { path: '', saveId: '' }],
    }))
  }

  const HandleToRemoveMapper = (index: number) => {
    setConfiguration((prev) => ({
      ...prev,
      mappers: prev.mappers.filter((_, idx) => idx !== index),
    }))
  }

  const HandleToSave = () => {
    if (!nodeInformation) return;
    UpdateRequestServiceConfiguration('updateConfiguration', nodeInformation, {
      configuration
    })
    automationFlowStore.setRequestServiceEditor({ openRequestServiceEditor: false })
  }

  return (
    <Dialog
      open={automationFlowStore.openRequestServiceEditor}
      onOpenChange={(open) => { automationFlowStore.setRequestServiceEditor({ openRequestServiceEditor: open }) }}
    >
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configuración de solicitud</DialogTitle>
          <DialogDescription>
            Configura la solicitud HTTP que ejecutará este nodo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-1.5">
            <Label>URL</Label>
            <Input
              value={configuration.url}
              placeholder="https://api.example.com/endpoint"
              onChange={(e) => setConfiguration((prev) => ({ ...prev, url: e.target.value }))}
            />
          </div>

          <div className="grid gap-1.5">
            <Label>Método</Label>
            <Select
              value={configuration.method}
              onValueChange={(value) => setConfiguration((prev) => ({ ...prev, method: value as NodeRequestServiceConfig['method'] }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un método" />
              </SelectTrigger>
              <SelectContent>
                {HTTP_METHODS.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Headers</Label>
              <Button onClick={HandleToAddHeader} variant={'outline'} size={'icon-sm'}>
                {IconsCatalog.addPlus.Icon}
              </Button>
            </div>
            {configuration.headers?.length ? (
              configuration.headers.map((header, index) => (
                <div key={index} className="flex gap-1.5 items-center">
                  <Input
                    value={header.key}
                    placeholder="key"
                    className="flex-1"
                    onChange={(e) => HandleToUpdateHeader(index, 'key', e.target.value)}
                  />
                  <Input
                    value={header.value}
                    placeholder="value"
                    className="flex-1"
                    onChange={(e) => HandleToUpdateHeader(index, 'value', e.target.value)}
                  />
                  <Button onClick={() => HandleToRemoveHeader(index)} variant={'outline'} size={'icon-xs'}>
                    {IconsCatalog.removex.Icon}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">Sin headers configurados.</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label>Body</Label>
            <Textarea
              value={configuration.body || ''}
              placeholder='{ "mensaje": "hola" }'
              rows={4}
              onChange={(e) => setConfiguration((prev) => ({ ...prev, body: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Mappers</Label>
              <Button onClick={HandleToAddMapper} variant={'outline'} size={'icon-sm'}>
                {IconsCatalog.addPlus.Icon}
              </Button>
            </div>
            {configuration.mappers?.length ? (
              configuration.mappers.map((mapper, index) => (
                <div key={index} className="flex gap-1.5 items-center">
                  <Input
                    value={mapper.path}
                    placeholder="path (ej. data.nombre)"
                    className="flex-1"
                    onChange={(e) => HandleToUpdateMapper(index, 'path', e.target.value)}
                  />
                  <Input
                    value={mapper.saveId}
                    placeholder="saveId (variable)"
                    className="flex-1"
                    onChange={(e) => HandleToUpdateMapper(index, 'saveId', e.target.value)}
                  />
                  <Button onClick={() => HandleToRemoveMapper(index)} variant={'outline'} size={'icon-xs'}>
                    {IconsCatalog.removex.Icon}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">Sin mappers configurados.</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant={'outline'} onClick={() => automationFlowStore.setRequestServiceEditor({ openRequestServiceEditor: false })}>
            Cancelar
          </Button>
          <Button onClick={HandleToSave}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
