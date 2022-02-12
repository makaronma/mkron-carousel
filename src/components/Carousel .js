import React, { useState, useEffect, useRef } from "react";

const Carousel = ({ divs, divWidth, divHeight }) => {
  const [index, setIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const touchStart = useRef();

  // Handle X-translation
  useEffect(() => {
    setTranslateX(-divWidth * index);
  }, [divWidth, index]);

  // Handle arrow click
  const handleClickLeft = () => {
    goPrevSlide();
  };
  const handleClickRight = () => {
    goNextSlide();
  };

  // Handle mobile swipe
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const posDif = touchEnd - touchStart.current;
    if (posDif < -divWidth / 2) {
      goNextSlide();
    } else if (posDif > divWidth / 2) {
      goPrevSlide();
    }
  };

  const goNextSlide = () => {
    setIndex((prev) => {
      if (prev >= divs.length - 1) return prev;
      return prev + 1;
    });
  };
  const goPrevSlide = () => {
    setIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
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
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
