import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { Carousel } from "../Caruosel";

test("lets users click on thumbnails to make them the hero", async () => {
  const images = ["1.jpg", "2.jpg", "3.jpg"];

  const carousel = render(<Carousel images={images} />);
  const heroThumbnail = await carousel.findByTestId("hero");
  expect(heroThumbnail.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const thumb = await carousel.findByTestId(`thumbnail${i}`);
    await thumb.click();

    expect(heroThumbnail.src).toContain(image);
    expect(Array.from(thumb.classList)).toContain("active");

    const restImageIndexes = Array.from(
      { length: images.length },
      (_, i) => i
    ).filter((imageIndex) => imageIndex !== i);

    for (let restImageIndex of restImageIndexes) {
      const thumb = await carousel.findByTestId(`thumbnail${restImageIndex}`);
      expect(Array.from(thumb.classList).includes("active")).toEqual(false);
    }
  }

  carousel.unmount();
});
