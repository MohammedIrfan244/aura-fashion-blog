import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function BoutiqueCard({ boutique = {}, boutiqueIndex }) {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleClck = () => {
    navigate(`/boutiques`, { state: { boutiqueIndex } });
  };

  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.5}>
      <div
        ref={ref}
        className={`h-[400px] w-80 overflow-hidden relative hover:text-electricBlue card_hover bg-[#000002] hover:scale-[1.01] transition-all ease-out ${
          inView ? 'animate-slideY opacity-100' : 'opacity-0'
        }`}
        style={{
          animationDuration: `${(boutiqueIndex + 1) * 200}ms`,
        }}
        onClick={handleClck}
      >
        <div className='w-full h-full flex justify-center items-center'>
        <img
          src={boutique?.image}
          alt={boutique?.name}
          className="w-full object-cover"
        />
        </div>
        <p className="absolute left-5 top-3 font-extralight font-agdasima text-lg">
          {boutique?.name}
        </p>
      </div>
    </Tilt>
  );
}

export default BoutiqueCard;
