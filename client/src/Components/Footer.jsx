import auraHero from '../assets/auraHeroSmall.png'
import { HiArrowLongRight } from "react-icons/hi2";
function Footer() {
  return (
    <div className="h-60 sm:h-80 md:h-96 mt-10">
      <div className="bg-snowWhite flex h-1/2 items-center justify-between px-5">
      <div className="flex items-center space-x-5 sm:space-x-10 md:space-x-20 lg:space-x-24">
        <img src={auraHero} className='w-[70px] sm:w-[100px]' alt="" />
        <p className="text-richBlack text-3xl sm:text-4xl md:text-5xl font-beban font-semibold">Connect With Us</p>
        </div>
      <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-electricBlue flex justify-center items-center">
      <HiArrowLongRight className='text-richBlack text-2xl'/>
      </div>
      </div>
      <div className="bg-black p-10 h-1/2">
      <p className='text-2xl sm:text-3xl md:text-4xl w-60'>Elevate Your Fashion with Aura</p>
      </div>
    </div>
  );
}

export default Footer;
