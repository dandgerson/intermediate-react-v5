import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "./Caruosel";
import { ErrorBoundary } from "./ErrorBoundary";
import { useState } from "react";
import { Modal } from "./Modal";
import { useDispatch } from "react-redux";
import { adopt } from "./adoptedPetSlice";
import { usePetQuery } from "./petApiService";

export const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [isModalShown, setIsModalShown] = useState(false);
  const navigate = useNavigate();

  const result = usePetQuery({ id });

  if (result.isError) {
    return <h2>ohno!!!</h2>;
  }

  if (result.isFetching) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = result.data;

  return (
    <div className="details">
      <Carousel images={pet?.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
        <button
          onClick={() => setIsModalShown(true)}
        >{`Adopt ${pet.name}`}</button>
        <p>{pet.description}</p>

        {isModalShown ? (
          <Modal
            renderContent={() => {
              return (
                <div>
                  <h1>Would you like to adopt {pet.name}?</h1>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        setIsModalShown(false);
                        dispatch(adopt(pet));
                        navigate("/");
                      }}
                    >
                      Yes
                    </button>
                    <button onClick={() => setIsModalShown(false)}>No</button>
                  </div>
                </div>
              );
            }}
            target="#modal"
            onCancel={() => setIsModalShown(false)}
          />
        ) : null}
      </div>
    </div>
  );
};

export const DetailsWithErrorBoundary = (props) => (
  <ErrorBoundary
    renderErrorContent={() => (
      <h2>
        There was an error with this listing.{" "}
        <Link to={"/"}>Click here to go back to the home page</Link>
      </h2>
    )}
  >
    <Details {...props} />
  </ErrorBoundary>
);
