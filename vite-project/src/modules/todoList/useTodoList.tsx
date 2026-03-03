import { useInfiniteQuery } from "@tanstack/react-query";
import { totoListApi } from "./api";
import { useCallback, useRef } from "react";

export const useTodoList = () => {
  const {
    data: todoItems,
    error,
    isPending,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...totoListApi.getTodoListInfinityQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const cursor = (
    <div ref={cursorRef}>
      {!hasNextPage && <span>No more items...</span>}
      {isFetchingNextPage && <span>Loading...</span>}
    </div>
  );

  return {
    todoItems,
    error,
    isPending,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    cursor,
  };
};

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef<(() => void) | null>(() => {});

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });
    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current?.();
    }
    // return () => {
    //   observer.disconnect();
    // };
  }, []);
}
