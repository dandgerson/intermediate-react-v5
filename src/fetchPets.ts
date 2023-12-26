import { QueryFunction, QueryKey } from "@tanstack/react-query";
import { PetApiResponse } from "./apiResponseTypes";

export const fetchPets: QueryFunction<
  PetApiResponse,
  ["details", string]
> = async ({ queryKey }) => {
  const [, id] = queryKey;

  const apiResponse = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiResponse.ok) {
    throw new Error(`details/${id} fetch is not ok`);
  }

  return apiResponse.json();
};
