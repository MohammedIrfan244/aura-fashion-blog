import { useLocation, useNavigate } from "react-router-dom";
import GoTopPopUp from "../Shared/GoTopPopUp";
import { SiStylelint } from "react-icons/si";
import { LuUser, LuDot } from "react-icons/lu";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSearchBar } from "../Redux/CommonSlice";

function StyleDetailPage() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const location = useLocation();
  const { style, author } = location.state;

  const { likedStyles, currentUser } = useSelector((state) => state.currentUser);
  const isLiked = likedStyles[style?.id]?true:false


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 px-5" onClick={() => dispatch(hideSearchBar())}>
      <div
        className="flex bg-[#242427] h-14 sm:h-20 items-center gap-5 justify-center text-sm animate-slideY"
        style={{
          animationDuration: "300ms",
          "--tw-translate-y": "-20px",
          "--tw-translate-y-70": "0px",
        }}
      >
        <p className="flex items-center gap-2">
          <LuDot />
          FASHION <SiStylelint />
        </p>
        <p className="flex items-center gap-2">
          <LuDot />
          {author} <LuUser />
        </p>
        <p className="flex items-center gap-2 cursor-pointer" onClick={currentUser?null:()=>navigate('/login_Signup')}>
          <LuDot />
          {Math.max(style?.likes,0)}
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </p>
      </div>
      <div className="flex flex-col items-center mt-5 gap-5 sm:gap-10">
        <p className="font-agdasima text-3xl sm:text-5xl">{style?.styleName}</p>
        <p className="sm:w-2/3 text-sm">{style?.styleDescription}</p>
        <div
          className="sm:w-3/5 h-auto animate-circGrow transition-all"
          style={{ animationDuration: "500ms" }}
        >
          <img src={style?.styleImage} className="object-cover h-full w-full" alt={style?.styleName} />
        </div>
        <p className="text-2xl sm:text-3xl font-agdasima">{style?.styleName}</p>
        <div className="w-full sm:w-2/3 flex flex-col gap-5 sm:gap-10">
          {style?.styleContent.map((u, i) => (
            <div className="flex flex-col gap-3" key={i}>
              <h2 className="font-beban tracking-widest text-xl">{u?.styleContentTitle}</h2>
              <p className="text-sm sm:text-base">{u?.styleContentDetails}</p>
            </div>
          ))}
          <p className="text-xs text-right">Thanks for checking out - {author}</p>
        </div>
        <GoTopPopUp />
      </div>
    </div>
  );
}

export default StyleDetailPage;
