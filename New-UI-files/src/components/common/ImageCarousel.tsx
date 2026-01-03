import React from "react";
import { Carousel } from "react-bootstrap";

interface ImageCarouselProps {
  images: string[];
  height?: string;
  borderRadius?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = "420px",
  borderRadius = 16,
}) => {
  return (
    <Carousel
      fade
      indicators
      controls
      interval={4000}
      className="hero-carousel"
    >
      {images.map((src, index) => (
        <Carousel.Item key={index}>
          <div
            style={{
              height,
              overflow: "hidden",
              borderRadius,
            }}
          >
            <img
              src={src}
              alt={`slide-${index}`}
              className="d-block w-100"
              style={{
                height: "100%",
                objectFit: "cover",
                borderRadius,
              }}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
