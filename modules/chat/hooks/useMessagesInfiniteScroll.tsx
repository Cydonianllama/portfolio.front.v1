import { RefObject, useEffect } from "react";

export const useMessagesInfiniteScroll = ({
  topRef,
  wrapperListMessagesRef,
  handleLoadMore
}: {
  topRef: RefObject<HTMLDivElement | null>,
  wrapperListMessagesRef: RefObject<HTMLDivElement | null>,
  handleLoadMore: () => void
}) => {
  //
  // Paginacion: al scrollear hacia elúltimo elemento se volvera a listar más elementos
  //
  useEffect(() => {
    const target = topRef?.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMore()
        }
      },
      {
        root: wrapperListMessagesRef?.current,
        threshold: 0.1,
      }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [handleLoadMore, topRef, wrapperListMessagesRef]);
}