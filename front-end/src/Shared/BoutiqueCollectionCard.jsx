import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";

// eslint-disable-next-line react/prop-types
function BoutiqueCollectionCard({ boutique = {}, click, blur }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.5}
      className={blur ? "blur-sm" : "blur-0"}
    >
      <div
        onClick={click}
        ref={ref}
        className={`h-[350px] w-80 overflow-hidden text-richBlack font-semibold  bg-[#000002] transition-all ease-out ${
          inView ? "animate-slideY opacity-100" : "opacity-0"
        }`}
        style={{
          animationDuration: `${500}ms`,
          "--tw-translate-y": "0px",
          "--tw-translate-y-70": "0px",
        }}
      >
        <img
          src={boutique?.collectionImage}
          alt={boutique?.collectionName}
          className="w-full h-full object-cover hover:scale-[1.02] transition-all ease-out"
        />
      </div>
      <p className="font-agdasima">{boutique?.collectionName}</p>
      <p className="text-xl font-agdasima">$ {boutique?.collectionPrice}</p>
    </Tilt>
  );
}

export default BoutiqueCollectionCard;
