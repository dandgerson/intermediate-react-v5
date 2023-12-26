import { ReactElement, createContext, useContext, useState } from "react";
import { Pet } from "./apiResponseTypes";

const AdoptedPetContext = createContext<
  [Pet | null, React.Dispatch<React.SetStateAction<Pet | null>>]
>([null, () => {}]);

export const AdoptedPetContextProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const petState = useState<Pet | null>(null);

  return (
    <AdoptedPetContext.Provider value={petState}>
      {children}
    </AdoptedPetContext.Provider>
  );
};

export const useAdoptedPetContext = () => useContext(AdoptedPetContext);
