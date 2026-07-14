import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import axios from "axios"
import { useEffect, useState } from "react"
import { api } from '@/setup/axios'

export const IntegrationSection = () => {

  const [integrationsJson, setIntegrationsJson] = useState<Array<{ code: string, title: string }>>([])

  const GetListIntegrationsFile = async () => {
    console.log('GetListIntegrationsFile')
    try {
      const reqFile = await api.get(`/static/integrations.json`)
      console.log(reqFile.data)
      setIntegrationsJson(reqFile.data)
    } catch (ex) {

    }
  }

  useEffect(() => {
    GetListIntegrationsFile()
  }, [])

  return (<>
    <div className="space-y-2 flex flex-col">
      {integrationsJson.map((el, index) => (
        <Item variant="outline" key={index}>
          <ItemContent>
            <ItemTitle>{el.title}</ItemTitle>
            <ItemDescription>
              A simple item with title and description.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  </>)
}