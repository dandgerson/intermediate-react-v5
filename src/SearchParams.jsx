import { useState } from "react";
import { Results } from "./Results";
import { useSelector, useDispatch } from "react-redux";
import { all } from "./searchParamsSlice";
import { useBreedListQuery, useSearchQuery } from "./petApiService";

const animals = ["bird", "dog", "cat", "reptile", "rabbit"];

export const SearchParams = () => {
  const dispatch = useDispatch();

  const [animal, setAnimal] = useState("");
  const { data: breeds } = useBreedListQuery(animal, { skip: !animal });

  const requestParams = useSelector((state) => state.searchParams.value);

  const serchResults = useSearchQuery(requestParams);

  const adoptedPet = useSelector((state) => state.adoptedPet.value);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const params = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };

          dispatch(all(params));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}

        <label htmlFor="localion">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            value={animal}
          >
            <option />
            {animals.map((animalName) => (
              <option key={animalName} value={animalName}>
                {animalName}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breeds
          <select name="breed" id="breed" disabled={!breeds}>
            <option />
            {breeds?.map((breedName) => (
              <option key={breedName} value={breedName}>
                {breedName}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>

      {serchResults.isLoading ? (
        <div className="loading-pane">
          <h2 className="loader">🌀</h2>
        </div>
      ) : (
        <Results pets={serchResults.data} />
      )}
    </div>
  );
};
