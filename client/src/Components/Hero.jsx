import auraHero from "../images/auraHeroSmall.png";


function Hero() {
  const text = " Aura -Bold-Limitless-Empowered-";
  const innerText = text.split("").map((char, i) => (
    <span style={{ transform: `rotate(${i * 11}deg)` }} key={i}>
      {char}
    </span>
  ));

  return (
    <div className="w-screen flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 h-[100vh] sm:h-screen relative">
        <div className="circle">
          <div className="logo">
            <div className="w-full h-full overflow-hidden rounded-full absolute backdrop-blur-sm ">
              <img
                src={auraHero}
                className="object-cover aura_hero w-full h-full animate-circGrow"
                style={{ animationDuration: "500ms" }}
              />
            </div>
            <div className="text">
              <p className="font-beban">{innerText}</p>
            </div>
          </div>
        </div>
        <p className="text-center text-electricBlue text-xl font-agdasima absolute bottom-5 left-[46%] animate-pulse">
          Swipe Up
        </p>
      </div>

      <div className="hidden sm:w-1/2 sm:h-screen sm:block sm:relative">
        <img
          className="object-cover w-full h-full"
          src="https://i.pinimg.com/736x/fa/9d/98/fa9d9861ade98ed07508e4b01ade8d93.jpg"
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