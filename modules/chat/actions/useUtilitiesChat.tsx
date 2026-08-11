/* eslint-disable react-hooks/exhaustive-deps */
import { GetTags } from "@/api/tags/tags.api"
import { GetTagsRequestDTO } from "@/api/tags/tags.dto"
import { UpdateRoomTags } from "@/api/chat/chat.api"
import { UpdateRoomTagsRequestDTO } from "@/api/chat/chat.dto"
import { useCallback } from "react"
import { toast } from "sonner"
import { chatUtilitiesStore } from "../store/store.utilities"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type UtilitiesChatHookActionsProps = {

}

export const useUtilitiesChatActions = ({ }: UtilitiesChatHookActionsProps) => {

  const chatUtilities = chatUtilitiesStore()

  const GetTagsAction = useCallback(async (data: GetTagsRequestDTO) => {
    try {
      const req = await GetTags(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }

      // success
      toast.success('Success')

      if (req.data.list) {
        chatUtilities.setTags(req.data.list || [])
      }


    } catch (ex) {

    } finally {

    }
  }, [])

  const UpdateRoomTagsAction = useCallback(async (data: UpdateRoomTagsRequestDTO) => {
    try {
      const req = await UpdateRoomTags(data)

      if (!req) {
        toast.error('Error al actualizar etiquetas')
        return;
      }

      if (!req.status) {
        toast.error(req.message || 'Error al actualizar etiquetas')
        return;
      }

      if (req.data?.room) {
        const participant = req.data.room?.participants.length ? req.data.room?.participants[0] || null : null

        if (participant) {
          chatUtilities.setRoomTags(participant?.tagsCopy?.map((el) => ({
            id: el.id || '',
            name: '',
            color: '',
            index: 0
          })) || [])
          toast.success('Etiquetas actualizadas')
        }

      }

    } catch (ex) {

    } finally {

    }
  }, [])

  return {
    GetTagsAction,
    UpdateRoomTagsAction
  }
}