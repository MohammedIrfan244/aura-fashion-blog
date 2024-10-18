import { FaCircle } from "react-icons/fa";

function DetailPopUp() {
  return (
    <div className="hidden sm:flex items-center text-electricBlue">
        <div className="p-3 space-y-3 border-2 border-electricBlue backdrop-blur-xl">
       <h1 className="text-lg font-beban tracking-widest">BALENCIAGA BB0180S SHIELD</h1>
       <h1 className="text-4xl font-beban text-right tracking-widesr">$ 438</h1>
       </div>
       <div className="w-32 h-[2px] bg-electricBlue"/>
       <FaCircle />
    </div>
  )
}

export default DetailPopUp