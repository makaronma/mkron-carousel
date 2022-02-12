import React, { useState } from "react";

const Carousel = ({ divs, divWidth, divHeight }) => {
  const [index, setIndex] = useState(0);

  const handleClickLeft = () => {
    setIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };
  const handleClickRight = () => {
    setIndex((prev) => {
      if (prev >= divs.length - 1) return prev;
      return prev + 1;
    });
  };

  const carouselStyle = {
    width: `${100 + divWidth}px`,
    height: `${30 + divHeight}px`,
  };

  return (
    <div className="carousel" style={carouselStyle}>
      <div
        className="divsContainer"
        style={{ transform: `translateX(${-divWidth * index}px)` }}
      >
        {divs}
      </div>

      <div className="arrow arrow-left" onClick={handleClickLeft}>
        <img src="/assets/circle-arrow-left.svg" alt="arrow left" />
      </div>
      <div className="arrow arrow-right" onClick={handleClickRight}>
        <img src="/assets/circle-arrow-right.svg" alt="arrow right" />
      </div>
      <div className="bullets">
        {divs.map((div, bulletIndex) => (
          <span
            className={`bullet ${bulletIndex === index ? "current" : ""}`}
            key={bulletIndex}
            onClick={() => setIndex(bulletIndex)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
