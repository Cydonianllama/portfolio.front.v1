import { RefObject, useEffect } from "react";

export const useChatScrollInfinite = ({
  handleLoadMoreContacts,
  downRefContacts,
  wrapperContacts
}: {
  handleLoadMoreContacts: () => void,
  downRefContacts: RefObject<HTMLDivElement | null>,
  wrapperContacts: RefObject<HTMLDivElement | null>
}) => {
  useEffect(() => {
    const target = downRefContacts?.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMoreContacts()
        }
      },
      {
        root: wrapperContacts?.current,
        threshold: 0.1,
      }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [handleLoadMoreContacts]);
}