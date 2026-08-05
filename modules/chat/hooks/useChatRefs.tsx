import { useRef } from "react";

export const useChatRefs = () => {
  const downRefContacts = useRef<HTMLDivElement>(null);
  const wrapperContacts = useRef<HTMLDivElement>(null)
  return {
    downRefContacts,
    wrapperContacts
  }
}