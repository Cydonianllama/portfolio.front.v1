import { useRef } from "react";

export const useMessageRefs = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const wrapperListMessagesRef = useRef<HTMLDivElement>(null)

  return {
    topRef, wrapperListMessagesRef
  }
}