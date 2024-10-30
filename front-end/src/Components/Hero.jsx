import { AiFillTag } from "react-icons/ai";
import { LuArrowBigDownDash } from "react-icons/lu";

function Hero() {
  return (
    <div className="w-screen flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 h-screen flex">
        <div className="w-1/2 h-[99vh] justify-end items-center flex flex-col">
          <p
            style={{
              writingMode: "vertical-rl",
              "--tw-height-70": "400px",
              "--tw-hieght-100": "400px",
              animationDuration: "700ms",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
            className="text-9xl z-10 transform rotate-180 flex items-baseline font-beban tracking-widest overflow-hidden -mb-20 animate-heightGrow"
          >
            <span className="text-electricBlue text-[150px]">V</span>IBINGS
          </p>
          <div
            className="w-56 h-56 rounded-full mb-5 animate-circGrow overflow-hidden shadow-lg shadow-black"
            style={{ animationDuration: "500ms" }}
          >
            <img
              src="https://img.freepik.com/premium-photo/closeup-round-compact-blush-black-casing-showcasing-its-pink-shade-against-grey-gradient-background_574957-8935.jpg?w=826"
              className="object-cover scale-150 w-full h-full"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col justify-between pb-16">
          <div className="flex flex-col">
            <div
              className="flex flex-col w-48 items-center animate-slideY"
              style={{
                "--tw-translate-y": "-100px",
                "--tw-translate-y-70": "20px",
                animationDuration: "700ms",
              }}
            >
              <div className="h-36 w-[2px] bg-snowWhite"></div>
              <div className="w-auto shadow-md h-auto relative hover:scale-[1.02] shadow-black hover:shadow-lg hover:shadow-black transition-all duration-300 ease-out">
                <img
                  src="https://img.freepik.com/free-photo/applying-red-lipstick-lips-close-up-photo-black-background-beauty-make-up_482257-10395.jpg?t=st=1729090464~exp=1729094064~hmac=b4526445bd14feb4c294474c31c643366b38a574d034301cf0586a51c4956282&w=360"
                  alt="image"
                  className="border-none"
                />
                <AiFillTag className="absolute top-0 right-[93px]" />
              </div>
            </div>
          </div>
          <div className="font-beban tracking-widest">
            <p
              className="text-xl animate-widthGrow overflow-hidden h-5 transition-all"
              style={{
                "--tw-width-100": "200px",
                animationDuration: "500ms",
              }}
            >
              Craft Your Aesthetic
            </p>
            <p className="text-3xl flex items-center">
              Here <LuArrowBigDownDash className="text-electricBlue" />
            </p>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 h-screen relative">
        <img
          className="object-cover w-full h-full"
          src="https://img.freepik.com/free-photo/abstract-portrait-with-light-effects_23-2151118176.jpg?t=st=1729092629~exp=1729096229~hmac=c6abe23876e7f599811d420891b6e17c91eb0aa5d0754a7b23702b0e38a1c684&w=740"
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
