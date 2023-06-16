import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const User: React.FC = () => {
  const arr = Array(5)
    .fill(null)
    .map((_, index) => index + 1);
  return (
    <div>
      {arr.map((number) => (
        <LazyLoadImage
          key={number}
          src={`/images/${number}.jpeg`}
          placeholderSrc={`/images/${number}-small.png`}
          width={600}
          height={400}
          alt="Image Alt"
          effect="blur"
        />
      ))}
    </div>
  );
};

export default User;