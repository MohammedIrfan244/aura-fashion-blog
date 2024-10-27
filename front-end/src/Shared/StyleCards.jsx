import { useInView } from "react-intersection-observer";

// eslint-disable-next-line react/prop-types
function StyleCards({ image, name }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`h-[400px] w-80 overflow-hidden card_hover relative hover:text-electricBlue cursor-pointer transition-all ease-in-out duration-75 ${
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
        {name}
      </p>
    </div>
  );
}

export default StyleCards;
