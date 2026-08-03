import { UseAppData } from "@/hooks/app/useAppData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpectedResponseConfig, ExpectedResponseType, IAutomationNode, NODE_TYPE_GENERAL_MESSAGE_SIMPLE } from "@erick/conversationalflow";
import { useAutomationEditor } from "../../hooks/useAutomationEditor";
import { useMessageEditorActions } from "../../hooks/useMessageEditorActions";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ExpectedResponseSectionProps = {

}

const EXPECTED_RESPONSE_OPTIONS: Array<{ value: ExpectedResponseType; label: string }> = [
  { value: 'none', label: 'Sin respuesta esperada' },
  { value: 'text', label: 'Texto' },
  { value: 'button', label: 'Botón' },
  { value: 'file', label: 'Archivo' },
  { value: 'image', label: 'Imagen' },
  { value: 'voice', label: 'Voz' },
  { value: 'video', label: 'Video' },
]

const EXPECTED_RESPONSE_LABEL: Record<ExpectedResponseType, string> = EXPECTED_RESPONSE_OPTIONS.reduce((acc, option) => ({
  ...acc,
  [option.value]: option.label
}), {} as Record<ExpectedResponseType, string>)

const buildConfigForType = (type: ExpectedResponseType, current?: ExpectedResponseConfig): ExpectedResponseConfig => {
  switch (type) {
    case 'none':
      return { type: 'none' }
    case 'text':
      return { type: 'text', placeholder: current?.type === 'text' ? current.placeholder : '' }
    case 'button':
      return { type: 'button' }
    case 'file':
      return { type: 'file', fileId: current?.type === 'file' ? current.fileId : '' }
    case 'image':
      return { type: 'image', fileId: current?.type === 'image' ? current.fileId : '' }
    case 'voice':
      return { type: 'voice', fileId: current?.type === 'voice' ? current.fileId : '' }
    case 'video':
      return { type: 'video', fileId: current?.type === 'video' ? current.fileId : '' }
  }
}

export const ExpectedResponseSection = ({ }: ExpectedResponseSectionProps) => {
  const useAppData = UseAppData()

  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateMessageConfiguration } = useMessageEditorActions()
  const nodeInformation = GetAutomationNodeInformation() as IAutomationNode<typeof NODE_TYPE_GENERAL_MESSAGE_SIMPLE>;

  const configuration = nodeInformation?.configuration

  const currentType: ExpectedResponseType = configuration?.expectedResponse || 'none'
  const currentConfig = configuration?.expectedResponseConfig

  const HandleChangeType = (value: ExpectedResponseType | null) => {
    if (!value) return;
    UpdateMessageConfiguration('updateExpectedResponse', nodeInformation, {
      expectedResponse: value,
      expectedResponseConfig: buildConfigForType(value, currentConfig)
    })
  }

  const HandleChangeConfig = (field: 'placeholder' | 'fileId', value: string) => {
    if (!currentConfig) return;
    UpdateMessageConfiguration('updateExpectedResponse', nodeInformation, {
      expectedResponse: currentType,
      expectedResponseConfig: { ...currentConfig, [field]: value } as ExpectedResponseConfig
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>Respuesta esperada</Label>
      </div>
      <Select value={currentType} onValueChange={HandleChangeType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona el tipo de respuesta esperada" />
        </SelectTrigger>
        <SelectContent>
          {EXPECTED_RESPONSE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {currentType === 'text' && currentConfig?.type === 'text' && (
        <div className="grid gap-1.5">
          <Label>Placeholder del texto esperado</Label>
          <Input
            value={currentConfig.placeholder || ''}
            placeholder="Ej. Escribe tu nombre"
            onChange={(e) => HandleChangeConfig('placeholder', e.target.value)}
          />
        </div>
      )}

      {(currentType === 'file' || currentType === 'image' || currentType === 'voice' || currentType === 'video')
        && currentConfig?.type === currentType && (
          <div className="grid gap-1.5">
            <Label>Archivo ({EXPECTED_RESPONSE_LABEL[currentType]})</Label>
            <Input
              value={currentConfig.fileId || ''}
              placeholder="Id del archivo"
              onChange={(e) => HandleChangeConfig('fileId', e.target.value)}
            />
          </div>
        )}

      <p className="text-xs text-muted-foreground">
        Tiempo de espera por defecto: 3 minutos
      </p>
    </div>
  )
}
