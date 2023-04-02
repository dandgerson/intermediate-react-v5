import { Pet } from "./Pet";

export const Results = ({ pets }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {pets.length ? (
      pets.map((pet) => (
        <Pet
          key={pet.id}
          id={pet.id}
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          images={pet.images}
          location={`${pet.city}, ${pet.state}`}
        />
      ))
    ) : (
      <h1>No Pets found!</h1>
    )}
  </div>
);
