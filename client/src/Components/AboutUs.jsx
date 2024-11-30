function AboutUs() {
  return (
    <div>
        <h1 className="text-center text-2xl my-10 font-windSong font-semibold">About Us</h1>
    <div className="flex h-[400px] sm:h-[500px] overflow-hidden bg-black">
     <div className="h-full w-full sm:w-1/2 flex justify-center p-5 flex-col gap-5 overflow-hidden relative">
<img src="https://i.pinimg.com/736x/3a/b2/d0/3ab2d094353c213c1f12cc21acbcf7f2.jpg" className="object-cover opacity-30 top-0 left-0 -z-0 h-full w-full sm:hidden absolute" alt="" />


        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-electricBlue z-0">nice to meet you</h1>
        <p className="z-0">
          Aura is a unique platform where fashion enthusiasts come to explore,
          learn, and showcase their love for style. From discovering curated
          fashion products to diving into expertly crafted tutorials, Aura is
          designed to inspire and empower individuals passionate about fashion.
        </p>
      </div>
        <div className="h-full overflow-hidden hidden sm:block w-1/2">
            <img className="object-cover" src="https://i.pinimg.com/736x/57/66/35/576635789a9881f83d7e633a72785503.jpg" alt="" />
        </div>
        </div>
    </div>
  );
}

export default AboutUs;
