import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner flex items-center justify-center text-center">
      <div>
        <h1 className="text-white text-5xl font-bold">
          Welcome to the Indian
          <br /> <span className="text-sky-500">Best Chef Recipe</span>
        </h1>
        <button className="btn mt-4">
          <a href="#chef">Explore</a>
        </button>
      </div>
    </div>
  );
};

export default Banner;
