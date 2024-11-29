import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoTopPopUp from "../Utilities/GoTop";
import { SiStylelint } from "react-icons/si";
import { LuUser, LuDot } from "react-icons/lu";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { hideSearchBar } from "../Redux/CommonSlice";
import { likeDecrement, likeIncrement, patchStyle } from "../Redux/StyleSlice";

function StyleDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { style: initialStyle, author } = location.state||{}

  const [style, setStyle] = useState(initialStyle);
  const { currentUser } = useSelector((state) => state.currentUser);

  const isLiked = style?.likes?.includes(currentUser?.id);

  const toggleLike = () => {
    if (!isLiked) {
      dispatch(likeIncrement({ styleId: style?.id, userId: currentUser?.id }));
      setStyle((prev) => ({
        ...prev,
        likes: [...prev.likes, currentUser?.id],
      }));
    } else {
      dispatch(likeDecrement({ styleId: style?.id, userId: currentUser?.id }));
      setStyle((prev) => ({
        ...prev,
        likes: prev.likes.filter((id) => id !== currentUser?.id),
      }));
    }

    dispatch(
      patchStyle({
        url: `http://localhost:3001/styles/${style?.id}`,
        id: style?.id,
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 px-5 min-h-screen" onClick={() => dispatch(hideSearchBar())}>
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
        <p
          className="flex items-center gap-2 cursor-pointer"
          onClick={currentUser ? toggleLike : () => navigate("/login_Signup")}
        >
          <LuDot />
          {Math.max(style?.likes?.length, 0)}
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
          <img
            src={style?.styleImage}
            className="object-cover h-full w-full"
            alt={style?.styleName}
          />
        </div>
        <p className="text-2xl sm:text-3xl font-agdasima">{style?.styleName}</p>
        <div className="w-full sm:w-2/3 flex flex-col gap-5 sm:gap-10">
          {style?.styleContent.map((u, i) => (
            <div className="flex flex-col gap-3" key={i}>
              <h2 className="font-beban tracking-widest text-xl">
                {u?.styleContentTitle}
              </h2>
              <p className="text-sm sm:text-base">{u?.styleContentDetails}</p>
            </div>
          ))}
          <p className="text-xs text-right">
            Thanks for checking out - {author}
          </p>
        </div>
        <GoTopPopUp />
      </div>
    </div>
  );
}

export default StyleDetailPage;
