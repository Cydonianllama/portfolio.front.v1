export type StepsInitItem = {
  title: string,
  actions: Array<{
    code: string
    text: string,
  }>,
  showDone: boolean,
  done: boolean
}

// uxComponent
// 	code
// 	type
// 	variant
// 	config
// 	status

// uxcomponentState
// 	workspaceId
// 	componentCode
// 	state