import { useState } from "react";

function Style() {
  const arr = [1, 2, 3, 4, 5,6,7,8];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? arr.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === arr.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mt-10 flex overflow-y-auto justify-between h-36">
      <button onClick={prevImage}>Previous</button>

      <div className="h-10 w-10 bg-slate-700">
        {arr[(currentIndex - 1 + arr.length) % arr.length]}
      </div>
      <div className="h-10 w-10 bg-slate-700">{arr[currentIndex]}</div>
      <div className="h-10 w-10 bg-slate-700">
        {arr[(currentIndex + 1) % arr.length]}
      </div>

      <button onClick={nextImage}>Next</button>
    </div>
  );
}

export default Style;
