//
// Sandbox de ejecucion de codigo en el preview del nodo codigo.
// Ejecuta JS del usuario con new Function inyectando el objeto $.
//

export interface CodeSandboxVariables {
  codeVariable: string;
  value?: unknown | null;
}

export interface CodeSandboxResult {
  logs: Array<string>;
  error: string | null;
}

export const executeCode = (
  content: string,
  roomVariables: Array<CodeSandboxVariables>,
  setVariable: (code: string, value: unknown) => void,
): CodeSandboxResult => {
  const logs: Array<string> = []

  const sandbox = {
    room: {
      variables: roomVariables,
    },
    setVariable: (code: string, value: unknown) => {
      setVariable(code, value)
      logs.push(`$: set ${code} = ${JSON.stringify(value)}`)
    },
    log: (...args: Array<unknown>) => {
      logs.push(args.map(el => (typeof el === 'string' ? el : JSON.stringify(el))).join(' '))
    },
  }

  try {
    const fn = new Function('$', content)
    const result = fn(sandbox)
    if (result !== undefined) {
      logs.push(`=> ${JSON.stringify(result)}`)
    }
    return { logs, error: null }
  } catch (error) {
    return {
      logs,
      error: error instanceof Error ? error.message : 'Error ejecutando código',
    }
  }
}
