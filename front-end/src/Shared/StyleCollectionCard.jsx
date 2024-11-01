import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function StyleCollectionCard({ style = {} ,index}) {
    const navigate=useNavigate()
  return (
    <div className="sm:px-5 flex flex-col sm:flex-row relative w-auto h-auto animate-slideX"
    style={{
        animationDuration: `500ms`,
        "--tw-translate-x": "-50px",
        "--tw-translate-x-70": "0px",
      }}>
      <div className="w-full sm:w-1/2 h-[80vh] sm:h-[100vh]">
        <img
          className="object-cover w-full h-full"
          src={style?.styleImage}
          alt={style?.styleName}
        />
      </div>
      <div className="pt-10 ps-3 w-full sm:w-1/2">
        <p className="flex items-center text-xs font-thin">
          FASHION <CiHeart className="text-base font-semibold ms-5 cursor-pointer me-1" />{" "}
          {style?.likes}
        </p>
        <div className="sm:bg-[#242427] sm:absolute sm:top-[10%] sm:left-[45%] h-auto sm:py-5 w-auto sm:px-20 flex items-center">
          <h2 className="text-2xl sm:text-4xl mt-5 sm:mt-0 font-agdasima">{style?.styleName}</h2>
        </div>
        <p className="text-sm mt-5 sm:mt-40">{style?.styleDescription}</p>
        <button onClick={()=>navigate(`/styles/${index}`,{state:{style}})} className="text-sm bg-snowWhite text-richBlack px-5 py-1 mt-5 sm:mt-10">Read Post</button>
      </div>
    </div>
  );
}

export default StyleCollectionCard;
