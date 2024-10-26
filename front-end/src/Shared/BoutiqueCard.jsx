import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';

// eslint-disable-next-line react/prop-types
function BoutiqueCard({image,name,index}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.5}>
    <div ref={ref} className={`h-[400px] w-80 overflow-hidden relative hover:text-electricBlue cursor-pointer flex items-center bg-[#000002] hover:scale-[1.01] transition-all ease-out ${
        inView ? "animate-slideY opacity-100" : "opacity-0"}`}  style={{
        animationDuration: `${(index+1)*500}ms`,
        "--tw-translate-y": "0px",
        "--tw-translate-y-70": "0px",
      }}>
      <img src={image} alt={name} className='w-full'/>
      <p className="absolute left-5 top-3 font-extralight font-agdasima text-lg">{name}</p>
    </div>
    </Tilt>
  )
}

export default BoutiqueCard