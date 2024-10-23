import { useInView } from "react-intersection-observer";

// eslint-disable-next-line react/prop-types
function StyleCards({ image, message }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`h-[400px] w-80 overflow-hidden relative hover:text-electricBlue transition-all hover:border-electricBlue hover:border-b-2 ease-in-out duration-75 ${
        inView ? "animate-slideY opacity-100" : "opacity-0"}`}
      style={{
        animationDuration: `500ms`,
        "--tw-translate-y": "300px",
        "--tw-translate-y-70": "0px",
      }}
    >
      <img src={image} alt="image" className="absolute -top-10" />
      <p className="font-agdasima absolute top-1 left-2 text-xl text-electricBlue">A</p>
      <p className="text-5xl absolute bottom-2 left-1 font-extralight">
        {message}
      </p>
    </div>
  );
}

export default StyleCards;
