import { Link } from "react-router-dom";
import { Pet as PetType } from "./apiResponseTypes";

export const Pet = ({
  name,
  animal,
  breed,
  location,
  id,
  images,
}: Omit<PetType, "city" | "state" | "description"> & { location: string }) => {
  const hero = "http://pets-images.dev-apis.com/pets/none.jpg";

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={images.length ? images[0] : hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};
