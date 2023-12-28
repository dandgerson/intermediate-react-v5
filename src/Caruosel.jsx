import { Component } from "react";

export class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel" data-testid="carousel">
        <img src={images[active]} alt="animal hero" data-testid="hero" />
        <div className="carousel-smaller">
          {images.map((image, i) => (
            <img
              src={image}
              key={image}
              alt="animal thumbnail"
              className={active === i ? "active" : ""}
              data-index={i}
              role="presentation"
              onClick={(e) => {
                this.setState({
                  active: Number(e.target.dataset.index),
                });
              }}
              data-testid={`thumbnail${i}`}
            />
          ))}
        </div>
      </div>
    );
  }
}
