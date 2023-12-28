import { test, expect } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";

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

test("gives back breeds when given an animal", async () => {
  const breeds = [
    "Havanese",
    "German Shepherd",
    "Dachshund",
    "French Bulldog",
    "Labrador",
    "Husky",
    "Shih Tzu",
    "Pit Bull",
    "Jack Russel Terrier",
    "Boxer",
    "Dalmation",
    "Pekingese",
    "Weimaraner",
    "Australian Shepherd",
    "Goldendoodle",
    "Wheaten Terrier",
  ];

  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );

  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  await waitFor(() => expect(result.current[0]).toHaveLength(breeds.length));

  const [breedList] = result.current;
  expect(breedList[0]).toBe(breeds[0]);
});
