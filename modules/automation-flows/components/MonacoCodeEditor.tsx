"use client"

import Editor from "@monaco-editor/react"

type MonacoCodeEditorProps = {
  language: 'javascript' | 'python'
  value: string
  onChange: (value: string) => void
}

export function MonacoCodeEditor({ language, value, onChange }: MonacoCodeEditorProps) {
  return (
    <Editor
      height="400px"
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={(val) => onChange(val || '')}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 13,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}
