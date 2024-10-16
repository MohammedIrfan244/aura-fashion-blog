import { useEffect, useState } from "react";
import { AiFillTag } from "react-icons/ai";

function Hero() {
    const[picVisible,setPicVisible]=useState(false)
    useEffect(()=>{
        const timer =setTimeout(() => {
            setPicVisible(true)
        },400);
        return ()=>clearTimeout(timer)
    },[])
  return (
    <div className="w-screen flex">
      <div className="w-1/2 h-screen flex">
        <div className="w-1/2 h-[99vh] justify-end items-center flex flex-col">
          <p
            style={{ writingMode: 'vertical-rl',"--tw-hieght-70":"400px","--tw-hieght-100":"400px",animationDuration:"700ms"}}
            className="text-9xl z-10 transform rotate-180 font-beban overflow-hidden -mb-20 animate-heightGrow"
          >
            SWAGGER
          </p>
          <div className="w-56 h-56 rounded-full bg-powderBlue z-0 mb-5 animate-circGrow" style={{animationDuration:"500ms"}}></div>
        </div>
        <div className="w-1/2 h-[99vh] flex flex-col">
          <div className="flex flex-col w-48 items-center animate-slideY" style={{
        "--tw-translate-y": "-100px",
        "--tw-translate-y-70": "20px",
        "animationDuration":"700ms"
      }}>
            <div className="h-40 w-[2px] bg-richBlack"></div>
            <div className="w-56 h-64 bg-slate-200 relative">
              <AiFillTag className="absolute top-0 right-[109px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen flex justify-end pe-10 items-center">
        {/* <ul className="text-lg font-bold">
          <li>Radiance</li>
          <li>Glow</li>
          <li>Essence</li>
        </ul> */}
        <div className="w-[450px] h-[450px] mt-20 rounded-full bg-softLavender flex justify-start animate-circGrow" style={{animationDuration:"700ms"}}>
          {picVisible&&<div className="w-72 h-80 overflow-hidden mt-40 animate-slideX flex justify-center items-center" style={{animationDuration:'500ms',"--tw-translate-x":"300px","--tw-translate-x-70":"-50px"}}>
            <img src="https://img.freepik.com/free-photo/young-flirtatious-woman-paints-her-lips-with-red-lipstick-lady-purple-blouse-bright-beret-posing-pink-background_197531-17571.jpg?t=st=1729080579~exp=1729084179~hmac=6cdb1f8afdf5646b1afd42d80a0dc2de89c46224c96e62ab2cefb1d5d4125b4c&w=360" alt="lipstick" />
            </div>}
        </div>
      </div>
    </div>
  );
}

export default Hero;
