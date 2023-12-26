import { QueryFunction } from "@tanstack/react-query";
import { PetApiResponse } from "./apiResponseTypes";

export const fetchSearch: QueryFunction<
  PetApiResponse,
  ["search", { animal: string; location: string; breed: string }]
> = async ({ queryKey }) => {
  const [, { animal, location, breed }] = queryKey;

  const response = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!response.ok) {
    throw new Error(`pet search is not ok, ${animal}, ${location}, ${breed}`);
  }

  return response.json();
};
