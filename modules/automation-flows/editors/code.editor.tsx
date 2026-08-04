import { BaseEditor } from "./_base.editor"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAutomationEditor } from "../hooks/useAutomationEditor"
import { useActionEditorActions } from "../hooks/useActionEditorActions"
import { executeCode } from "../utils/codeSandbox"
import { isCodeNode } from "../utils/node.guards"
import { useState } from "react"
import dynamic from "next/dynamic"

const MonacoCodeEditor = dynamic(
  () => import("../components/MonacoCodeEditor").then(mod => mod.MonacoCodeEditor),
  { ssr: false }
)

/* eslint-disable @typescript-eslint/no-empty-object-type */
type CodeEditorProps = {

}

export const CodeEditor = ({ }: CodeEditorProps) => {
  const { GetAutomationNodeInformation } = useAutomationEditor()
  const { UpdateActionConfiguration } = useActionEditorActions()

  const nodeInformation = GetAutomationNodeInformation()
  const isNode = isCodeNode(nodeInformation)

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [logs, setLogs] = useState<Array<string>>([])
  const [error, setError] = useState<string | null>(null)

  const scriptL = isNode ? (nodeInformation.configuration?.scriptL || 'js') : 'js'
  const content = isNode ? (nodeInformation.configuration?.content || '') : ''

  const HandleOpenEditor = () => {
    setDraft(content)
    setOpen(true)
  }

  const HandleSave = () => {
    if (!isNode) return;
    UpdateActionConfiguration('updateCode', nodeInformation, { scriptL, content: draft })
    setOpen(false)
  }

  const HandleChangeLanguage = (next: 'js' | 'python') => {
    if (!isNode) return;
    UpdateActionConfiguration('updateCode', nodeInformation, { scriptL: next, content })
  }

  const HandleRun = () => {
    const roomVariables = [{ codeVariable: 'fullname', value: 'Usuario de prueba' }]
    const result = executeCode(content, roomVariables, () => { })
    setLogs(result.logs)
    setError(result.error)
  }

  const previewLines = content.split('\n').filter(el => el.trim().length > 0)

  return (
    <BaseEditor>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Lenguaje</Label>
          <Select value={scriptL} onValueChange={(val) => HandleChangeLanguage(val as 'js' | 'python')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="js">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Código</Label>
          <div className="rounded-lg border bg-muted/30 p-2">
            {previewLines.length ? (
              <pre className="text-xs font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">{content}</pre>
            ) : (
              <p className="text-xs text-muted-foreground">Sin código. Haz clic en editar para escribir.</p>
            )}
          </div>
          <Button variant={'outline'} size={'sm'} className="w-full" onClick={HandleOpenEditor}>
            Editar código
          </Button>
        </div>

        <div className="space-y-1.5">
          <Button size={'sm'} onClick={HandleRun} className="w-full">
            Ejecutar
          </Button>
          {error && (
            <div className="text-xs text-red-600 bg-red-50 rounded p-2">{error}</div>
          )}
          {logs.length > 0 && !error && (
            <div className="text-xs bg-black text-green-400 rounded p-2 font-mono space-y-0.5 max-h-40 overflow-y-auto">
              {logs.map((el, index) => <div key={index}>{el}</div>)}
            </div>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar código</DialogTitle>
            <DialogDescription>
              Puedes usar $ para acceder a variables de la room: $.room.variables, $.setVariable(code, value), $.log(...)
            </DialogDescription>
          </DialogHeader>
          <MonacoCodeEditor
            language={scriptL == 'python' ? 'python' : 'javascript'}
            value={draft}
            onChange={setDraft}
          />
          <DialogFooter>
            <Button variant={'outline'} onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={HandleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BaseEditor>
  )
}
