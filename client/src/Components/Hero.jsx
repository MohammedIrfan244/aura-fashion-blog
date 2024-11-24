import { useState } from 'react';
import auraHero from '../assets/auraHero.png'
import invertedAuraHero from '../assets/invertedAuraHero.png'

function Hero() {
  const [hover,setHover]=useState(false)
  const text = " Aura -Bold-Limitless-Empowered-";
  const innerText = text.split("").map((char, i) => (
    <span style={{ transform: `rotate(${i * 11}deg)` }} key={i}>
      {char}
    </span>
  ));
  return (
    <div className="w-screen flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 h-[100vh] sm:h-screen flex justify-center items-center">
        <div className="circle" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
          <div className="logo">
            <div className='w-full h-full overflow-hidden rounded-full absolute'>
            {! hover&&<img src={auraHero} className="w-full h-full object-cover animate-circGrow" style={{animationDuration:"500ms"}} />}
            {hover &&<img src={invertedAuraHero} className="w-full h-full object-cover animate-circGrow" style={{animationDuration:"500ms"}} /> }
            </div>
            <div className="text">
              <p className="font-beban">{innerText}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:w-1/2 sm:h-screen sm:block sm:relative">
        <img
          className="object-cover w-full h-full"
          src="https://i.pinimg.com/control2/736x/fa/9d/98/fa9d9861ade98ed07508e4b01ade8d93.jpg"
          alt="cover image"
        />

        <div className="absolute bottom-12 backdrop-blur-md left-10 border-2 hover:border-electricBlue hover:text-electricBlue border-snowWhite px-3">
          <p className="font-agdasima text-3xl">AURA</p>
          <p className="font-beban">Get ready with us</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
