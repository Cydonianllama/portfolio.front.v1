/* eslint-disable @typescript-eslint/no-empty-object-type */
type HeadingHomeProps = {
  name: string
}

export function HeadingHome({ name } : HeadingHomeProps){
  return(<>
    <div className="">
      <h1 className="text-2xl font-bold text-foreground">Bienvenido {name}</h1>
      <p className="text-muted-foreground text-sm">Lorem ipsum dolor sit.</p>
    </div>
  </>)
}