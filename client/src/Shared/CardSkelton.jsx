import Tilt from "react-parallax-tilt";

function CardSkelton() {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.5}
      className="h-[400px] w-80 space-y-2 bg-black"
    >
      {/* <div className="h-[350px] w-full bg-[#666669] relative">
        <div className="h-40 w-40 top-14 left-10 rounded-full bg-[#A3A3A6] absolute"/>
        <div className="h-40 w-40 bg-[#A3A3A6] left-28 top-32 absolute"/>
      </div>
      <div className="bg-[#A3A3A6] h-5 w-32"/>
      <div className="bg-[#A3A3A6] h-3 w-56"/> */}
    </Tilt>
  )
}

export default CardSkelton
