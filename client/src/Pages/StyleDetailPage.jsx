import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoTopPopUp from "../Utilities/GoTop";
import { SiStylelint } from "react-icons/si";
import { LuUser, LuDot } from "react-icons/lu";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { hideSearchBar } from "../Redux/CommonSlice";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import axiosInstance from "../Utilities/axiosInstance";
import StyleDetailPageSkeleton from "../skeltons/StyleDetailPageSkeleton";

function StyleDetailPage() {
  const [style, setStyle] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const getStyle = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          import.meta.env.VITE_API_URL + `/style/style-by-id/${id}`
        );
        setStyle(response.data.style);
        setIsLiked(response.data.style.isLiked);
        setLikeCount(response.data.style.likeCount);
      } catch (error) {
        console.log(axiosErrorManager(error));
      } finally {
        setLoading(false);
      }
    };
    getStyle();
  }, [id]);
  const handleLike = async () => {
    try {
      await axiosInstance.post(`/style/style-like/${id}`);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };
  return (
    <>
      {loading ? (
        <StyleDetailPageSkeleton />
      ) : (
        <div
          className="pt-16 px-5 min-h-screen"
          onClick={() => dispatch(hideSearchBar())}
        >
          <div
            className="flex bg-[#242427] h-14 sm:h-20 items-center gap-5 justify-center text-sm animate-slideY"
            style={{
              animationDuration: "500ms",
              "--tw-translate-y": "-20px",
              "--tw-translate-y-70": "0px",
            }}
          >
            <p className="flex items-center gap-2">
              <LuDot />
              FASHION <SiStylelint />
            </p>
            <p className="flex font-semibold items-center gap-2">
              <LuDot />
              {style?.author?.toUpperCase()} <LuUser className="text-lg" />
            </p>
            <p
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleLike}
            >
              <LuDot />
              {likeCount}
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </p>
          </div>
          <div className="flex flex-col items-center mt-5 gap-5 sm:gap-10">
            <p className="font-agdasima text-3xl sm:text-5xl">{style?.name}</p>
            <p className="sm:w-2/3 text-sm">{style?.desciption}</p>
            <div
              className="sm:w-3/5 h-auto animate-circGrow transition-all"
              style={{ animationDuration: "500ms" }}
            >
              <img
                src={style?.image}
                className="object-cover h-full w-full"
                alt={style?.name}
              />
            </div>
            <p className="text-2xl sm:text-3xl font-agdasima">{style?.name}</p>
            <div className="w-full sm:w-2/3 flex flex-col gap-5 sm:gap-10">
              {style?.content?.map((u, i) => (
                <div className="flex flex-col gap-3" key={i}>
                  <h2 className="font-beban tracking-widest text-xl">
                    {u?.contentTitle}
                  </h2>
                  <p className="text-sm sm:text-base">{u?.contentDetails}</p>
                </div>
              ))}
              <p className="text-xs text-right font-semibold">
                Thanks for checking out &nbsp; -&nbsp;{" "}
                {style?.author?.toUpperCase()}
              </p>
            </div>
            <GoTopPopUp />
          </div>
        </div>
      )}
    </>
  );
}

export default StyleDetailPage;
