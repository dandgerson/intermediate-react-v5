import { test, expect } from "vitest";
import { render, renderHook } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBreedList } from "../useBreedList";

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  },
});

test("gives an empty list if no animal provided (raw testing)", async () => {
  function getBreedList(animal) {
    let list = null;

    function TestComponent() {
      list = useBreedList(animal);
      return null;
    }

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    return list;
  }

  const [breedList] = getBreedList();

  expect(breedList).toHaveLength(0);
});

test("gives an empty list if no animal provided (with renderHook)", async () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breedList] = result.current;

  expect(breedList).toHaveLength(0);
});
