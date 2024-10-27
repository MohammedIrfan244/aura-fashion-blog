import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';

// eslint-disable-next-line react/prop-types
function BoutiqueCollectionCard({boutique={},click}) {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });
    return (
      <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.5}>
      <div onClick={click} ref={ref} className={`h-[400px] w-80 overflow-hidden relative text-richBlack font-semibold flex boutiques-center bg-[#000002] hover:scale-[1.01] transition-all ease-out ${
          inView ? "animate-slideY opacity-100" : "opacity-0"}`}  style={{
          animationDuration: `${500}ms`,
          "--tw-translate-y": "0px",
          "--tw-translate-y-70": "0px",
        }}>
        <img src={boutique?.collectionImage} alt={boutique?.collectionName} className='w-full'/>
        <p className="absolute left-5 top-3 text-xl font-agdasima">{boutique?.collectionName}</p>
        <p className="absolute right-5 bottom-3 text-2xl font-agdasima">$ {boutique?.collectionPrice}</p>
      </div>
      </Tilt>
    )
}

export default BoutiqueCollectionCard
