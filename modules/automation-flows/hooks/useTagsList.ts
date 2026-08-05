import { useCallback, useEffect, useState } from "react";
import { GetTags } from "@/api/tags/tags.api";
import { TagDTO } from "@/api/tags/tags.dto";
import { useAppData } from "@/hooks/app/useAppData";

export const useTagsList = () => {
  const useAppData = useAppData()
  const workspaceId = useAppData.workspace?.id || ''

  const [tags, setTags] = useState<Array<TagDTO>>([])
  const [loading, setLoading] = useState(false)

  const reload = useCallback(async () => {
    if (!workspaceId) return
    setLoading(true)
    const req = await GetTags({ workspaceId, page: 1 })
    if (req?.status && req.data) {
      setTags(req.data.list)
    }
    setLoading(false)
  }, [workspaceId])

  useEffect(() => {
    reload()
  }, [reload])

  return {
    tags,
    loading,
    reload,
  }
}
