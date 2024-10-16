import { AiFillTag } from "react-icons/ai";

function Hero() {
  return (
    <div className="w-screen flex">
      <div className="w-1/2 h-screen flex">
        <div className="w-1/2 h-[99vh] justify-end items-center flex flex-col">
          <p
            style={{ writingMode: 'vertical-rl' }}
            className="text-9xl z-10 transform rotate-180 font-beban -mb-20"
          >
            SWAGGER
          </p>
          <div className="w-56 h-56 rounded-full bg-powderBlue z-0 mb-5 animate-circGrow"></div>
        </div>
        <div className="w-1/2 h-[99vh] flex flex-col">
          <div className="flex flex-col w-48 items-center animate-slideDown">
            <div className="h-40 w-[2px] bg-richBlack"></div>
            <div className="w-40 h-56 bg-slate-200 relative">
              <AiFillTag className="absolute top-0 right-[77px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen flex justify-start gap-16 pt-16">
        <ul className="text-lg font-bold">
          <li>Radiance</li>
          <li>Glow</li>
          <li>Essence</li>
        </ul>
        <div className="w-[450px] h-[450px] mt-20 rounded-full bg-softLavender flex justify-start">
          <div className="bg-slate-200 w-72 h-80 mt-40"></div> {/* No animation applied here */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
