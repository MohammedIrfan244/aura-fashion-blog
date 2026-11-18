import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoTopPopUp from "../Utilities/GoTop";
import { SiStylelint } from "react-icons/si";
import { LuUser, LuDot, LuTrash2 } from "react-icons/lu";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { hideSearchBar } from "../Redux/CommonSlice";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import axiosInstance from "../Utilities/axiosInstance";
import StyleDetailPageSkeleton from "../skeltons/StyleDetailPageSkeleton";

function StyleDetailPage() {
  const [style, setStyle] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const { currentUser } = useSelector((state) => state.currentUser);
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/style/comments/${id}`);
        setComments(response.data.comments || []);
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    };
    if (id) {
      fetchComments();
    }
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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || submittingComment) return;
    try {
      setSubmittingComment(true);
      const res = await axiosInstance.post(`/style/comment/${id}`, {
        comment: commentText.trim(),
      });
      setComments((prev) => [res.data.comment, ...prev]);
      setCommentText("");
    } catch (err) {
      console.log(axiosErrorManager(err));
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/style/comment/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.log(axiosErrorManager(err));
    }
  };

  return (
    <>
      {loading ? (
        <StyleDetailPageSkeleton />
      ) : (
        <div
          className="pt-16 px-5 min-h-screen text-snowWhite"
          onClick={() => dispatch(hideSearchBar())}
        >
          <div
            className="flex bg-[#242427] h-14 sm:h-20 items-center gap-5 justify-center text-sm animate-slideY rounded-md"
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
              className="flex items-center gap-2 cursor-pointer select-none hover:text-electricBlue transition-colors"
              onClick={handleLike}
            >
              <LuDot />
              {likeCount}
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </p>
          </div>

          <div className="flex flex-col items-center mt-5 gap-5 sm:gap-10 pb-16">
            <h1 className="font-agdasima text-3xl sm:text-5xl text-center">{style?.name}</h1>
            <p className="sm:w-2/3 text-sm text-gray-300 text-center leading-relaxed">
              {style?.description}
            </p>

            <div
              className="sm:w-3/5 h-auto rounded-lg overflow-hidden animate-circGrow transition-all shadow-xl shadow-black/40"
              style={{ animationDuration: "500ms" }}
            >
              <img
                src={style?.image}
                className="object-cover h-full w-full"
                alt={style?.name}
              />
            </div>

            <div className="w-full sm:w-2/3 flex flex-col gap-6 sm:gap-10 mt-4">
              {style?.content?.map((u, i) => (
                <div className="flex flex-col gap-2" key={i}>
                  <h2 className="font-beban tracking-widest text-xl text-snowWhite">
                    {u?.contentTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {u?.contentDetails}
                  </p>
                </div>
              ))}
              <p className="text-xs text-right font-semibold text-gray-400">
                Thanks for checking out &nbsp; -&nbsp;{" "}
                {style?.author?.toUpperCase()}
              </p>
            </div>

            {/* Comments Section */}
            <div className="w-full sm:w-2/3 mt-10 pt-8 border-t border-[#2E2E33]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-beban tracking-wider">
                  Discussion & Comments
                </h3>
                <span className="text-xs bg-[#2E2E33] px-3 py-1 rounded-full text-gray-300 font-semibold">
                  {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
                </span>
              </div>

              <form onSubmit={handleAddComment} className="relative mb-8">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Leave a comment on this post..."
                  rows={3}
                  className="w-full bg-[#1A1A1E] text-snowWhite border border-[#2E2E33] rounded-lg p-4 pr-14 text-sm outline-none focus:border-electricBlue placeholder:text-gray-500 resize-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim() || submittingComment}
                  className="absolute bottom-4 right-4 bg-electricBlue text-white p-2.5 rounded-full hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 transition-all text-sm"
                  title="Send Comment"
                >
                  <PiPaperPlaneTilt />
                </button>
              </form>

              <div className="space-y-3">
                {comments.length === 0 ? (
                  <p className="text-center text-gray-500 py-6 text-sm">
                    No comments yet. Start the conversation!
                  </p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c._id}
                      className="bg-[#1E1E22] hover:bg-[#242429] transition-colors rounded-lg p-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 flex-grow">
                        {c.user?.profile ? (
                          <img
                            src={c.user.profile}
                            alt={c.user?.username || "User"}
                            className="w-8 h-8 rounded-full object-cover border border-gray-700"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-electricBlue/20 text-electricBlue font-bold flex items-center justify-center text-xs">
                            {c.user?.username ? c.user.username[0].toUpperCase() : "U"}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-snowWhite text-sm">
                              {c.user?.username || "Anonymous"}
                            </span>
                            <span className="text-[11px] text-gray-500">
                              {c.createdAt
                                ? new Date(c.createdAt).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                            {c.comment}
                          </p>
                        </div>
                      </div>

                      {currentUser && c.user && currentUser.username === c.user.username && (
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-gray-500 hover:text-red-500 transition-colors p-1"
                          title="Delete comment"
                        >
                          <LuTrash2 />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <GoTopPopUp />
          </div>
        </div>
      )}
    </>
  );
}

export default StyleDetailPage;
