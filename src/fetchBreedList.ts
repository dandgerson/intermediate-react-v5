import { QueryFunction } from "@tanstack/react-query";
import { Animal, BreedListApiResponse } from "./apiResponseTypes";

export const fetchBreedList: QueryFunction<
  BreedListApiResponse,
  ["breeds", Animal | null]
> = async ({ queryKey }) => {
  const [, animal] = queryKey;

  const apiResponse = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (!apiResponse.ok) {
    throw new Error(`breeds/${animal} fetch is not ok`);
  }

  return apiResponse.json();
};
