import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";

import { Results } from "../Results";

test("render corrects with no pets", async () => {
  const { asFragment } = render(<Results pets={[]} />);
  expect(asFragment()).toMatchSnapshot();
});

test("render corrects with pets", async () => {
  const pets = [
    {
      id: 1,
      name: "Luna",
      animal: "dog",
      city: "Seattle",
      state: "WA",
      description:
        "Luna is actually the most adorable dog in the world. Her hobbies include yelling at squirrels, aggressively napping on her owners' laps, and asking to be fed two hours before IT'S DAMN WELL TIME LUNA. Luna is beloved by her puppy parents and lazily resides currently in Seattle, Washington.",
      breed: "Havanese",
      images: [
        "http://pets-images.dev-apis.com/pets/dog25.jpg",
        "http://pets-images.dev-apis.com/pets/dog26.jpg",
        "http://pets-images.dev-apis.com/pets/dog27.jpg",
        "http://pets-images.dev-apis.com/pets/dog28.jpg",
        "http://pets-images.dev-apis.com/pets/dog29.jpg",
      ],
    },
    {
      id: 2,
      name: "Bunnahabhain",
      animal: "dog",
      city: "Minneapolis",
      state: "MN",
      description:
        "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
      breed: "Goldendoodle",
      images: [
        "http://pets-images.dev-apis.com/pets/dog31.jpg",
        "http://pets-images.dev-apis.com/pets/dog30.jpg",
        "http://pets-images.dev-apis.com/pets/dog32.jpg",
        "http://pets-images.dev-apis.com/pets/dog33.jpg",
      ],
    },
    {
      id: 3,
      name: "Olive",
      animal: "dog",
      city: "Minneapolis",
      state: "MN",
      description:
        "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
      breed: "Boxer",
      images: ["http://pets-images.dev-apis.com/pets/dog34.jpg"],
    },
    {
      id: 4,
      name: "Sudo",
      animal: "dog",
      city: "Denver",
      state: "CO",
      description:
        "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
      breed: "Wheaten Terrier",
      images: [
        "http://pets-images.dev-apis.com/pets/dog37.jpg",
        "http://pets-images.dev-apis.com/pets/dog38.jpg",
        "http://pets-images.dev-apis.com/pets/dog39.jpg",
      ],
    },
  ];

  const { asFragment } = render(
    <StaticRouter>
      <Results pets={pets} />
    </StaticRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
