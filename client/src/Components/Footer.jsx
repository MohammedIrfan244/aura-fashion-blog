import { useNavigate } from 'react-router-dom';
import auraHero from '../images/auraHeroSmall.png'
import { HiArrowLongRight } from "react-icons/hi2";
function Footer() {
  const navigate = useNavigate();
  return (
    <div className="h-80 md:h-96 lg:h-[450px] mt-20">
      <div className="bg-white flex h-1/2 items-center justify-between px-5">
      <div className="flex items-center space-x-5 sm:space-x-10 md:space-x-20 lg:space-x-24">
        <img src={auraHero} className='w-[70px] sm:w-[100px]' alt="Aura logo" />
        <p className="text-richBlack text-3xl sm:text-4xl md:text-5xl font-windSong font-semibold">Wanna be a Creator ?</p>
        </div>
      <div onClick={() => navigate("/subscription")} className="w-10 hover:cursor-pointer h-10 sm:w-10 sm:h-10 md:w-16 md:h-16 rounded-full bg-electricBlue flex justify-center items-center">
      <HiArrowLongRight className='text-richBlack text-2xl'/>
      </div>
      </div>
      <div className="bg-black p-10 h-1/2 flex items-start justify-between">
      <p className='hidden sm:block sm:text-2xl md:text-3xl lg:text-4xl w-60'>Elevate Your Fashion with Aura</p>
      <div className='space-y-1'>
        <p className='font-semibold text-sm'>Quick Links</p>
        <ul className='text-xs space-y-1'>
          <li onClick={() => navigate("/")} className='hover:cursor-pointer'>Home</li>
          <li onClick={() => navigate("/boutiques")} className='hover:cursor-pointer'>Boutiques</li>
          <li onClick={() => navigate("/styles")} className='hover:cursor-pointer'>Styles</li>
          <li onClick={() => navigate("/contact")} className='hover:cursor-pointer'>Contact</li>
        </ul>
      </div>
      <div className='space-y-1'>
        <p className='font-semibold text-sm'>Contact</p>
        <ul className='text-xs space-y-1'>
          <li>St #123, City</li>
          <li>aura@gmail.com</li>
          <li>+91 9999999999</li>
        </ul>
      </div>
      <div className='space-y-1'>
        <p className='font-semibold text-sm'>Social</p>
        <ul className='text-xs space-y-1'>
        <li className='hover:cursor-pointer'>Instagram</li>
        <li className='hover:cursor-pointer'>Facebook</li>
        <li className='hover:cursor-pointer'>Twitter</li>
        </ul>
      </div>
      </div>
      <div className='h-10 bg-[#242427] flex items-center justify-center'>
        <p className='text-center text-xs'>Copyright © 2024 Aura. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
