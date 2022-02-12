import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Carousel from "./components/Carousel ";
import "./App.css";

const App = () => {
  const [divs, setDivs] = useState([]);
  const [divWidth, setDivWidth] = useState(500);
  const [divHeight, setDivHeight] = useState(400);

  const widthRef = useRef();
  const heightRef = useRef();

  useEffect(() => {
    widthRef.current.value = 500;
    heightRef.current.value = 400;
  }, []);

  useEffect(() => {
    axios
      .get("https://picsum.photos/v2/list?page=2&limit=5")
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setDivs(
          data.map((image) => (
            <div key={image.id}>
              <img
                alt={image.id}
                src={image.download_url}
                width={divWidth}
                height={divHeight}
              />
            </div>
          ))
        );
      });
  }, [divWidth, divHeight]);

  return (
    <div className="App">
      <div className="InputArea">
        <div>
          <label>Width: </label>
          <input type="number" ref={widthRef} />
        </div>
        <div>
          <label>Height: </label>
          <input type="number" ref={heightRef} />
        </div>
        <div>
          <button
            onClick={() => {
              setDivWidth(parseInt(widthRef.current.value));
              setDivHeight(parseInt(heightRef.current.value));
            }}
          >
            Change
          </button>
        </div>
      </div>
      <Carousel divs={divs} divWidth={divWidth} divHeight={divHeight} />
    </div>
  );
};
export default App;
