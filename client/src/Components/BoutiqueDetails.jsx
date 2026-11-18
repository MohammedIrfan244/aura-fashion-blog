import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LuExternalLink, LuTrash2 } from "react-icons/lu";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import axiosInstance from "../Utilities/axiosInstance";
import axiosErrorManager from "../Utilities/axiosErrorManager";
import BoutiqueDetailsSkeleton from "../skeltons/BoutiqueDetailsSkeleton";

function BoutiqueDetails({ id, close }) {
  const [boutiqueItem, setBoutiqueItem] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { currentUser } = useSelector((state) => state.currentUser);

  useEffect(() => {
    const getBoutiqueItem = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance(
          `/boutique/get-boutique-by-id/${id}`
        );
        setBoutiqueItem(response.data.boutique);
      } catch (error) {
        console.log(axiosErrorManager(error));
      } finally {
        setLoading(false);
      }
    };
    getBoutiqueItem();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/boutique/reviews/${id}`);
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    };
    if (id) {
      fetchReviews();
    }
  }, [id]);

  useEffect(() => {
    if (boutiqueItem) {
      setMainImage(boutiqueItem.firstImage);
      setThumbnails([
        boutiqueItem.secondImage,
        boutiqueItem.thirdImage,
        boutiqueItem.fourthImage,
      ]);
    }
  }, [boutiqueItem]);

  const handleImageClick = (index) => {
    const updatedThumbnails = [...thumbnails];
    const newMainImage = updatedThumbnails[index];
    updatedThumbnails[index] = mainImage;
    setMainImage(newMainImage);
    setThumbnails(updatedThumbnails);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || submitting) return;
    try {
      setSubmitting(true);
      const res = await axiosInstance.post(`/boutique/review/${id}`, {
        review: commentText.trim(),
      });
      setReviews((prev) => [res.data.review, ...prev]);
      setCommentText("");
    } catch (err) {
      console.log(axiosErrorManager(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`/boutique/review/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.log(axiosErrorManager(err));
    }
  };

  return (
    <>
      {loading ? (
        <BoutiqueDetailsSkeleton />
      ) : (
        <div className="fixed inset-0 z-50 flex w-screen h-screen items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={close}
          ></div>
          {/* Modal Content */}
          <div className="relative z-10 w-[90%] sm:w-[900px] max-h-[90vh] bg-black text-white overflow-y-auto rounded-lg shadow-2xl p-4 sm:p-6 border border-[#2E2E33]">
            <div className="flex flex-col sm:flex-row gap-4 h-auto">
              <div className="hidden sm:flex flex-col h-[400px] gap-2">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index} className="h-1/3 w-24 overflow-hidden rounded border border-gray-800">
                    <img
                      onClick={() => handleImageClick(index)}
                      src={thumbnail}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover h-full w-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full sm:w-[350px] h-[320px] sm:h-[400px] overflow-hidden rounded border border-gray-800">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt="Main product"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Mobile thumbnails */}
              <div className="flex sm:hidden gap-2 mt-1 h-20">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index} className="flex-1 h-full rounded overflow-hidden border border-gray-800">
                    <img
                      onClick={() => handleImageClick(index)}
                      src={thumbnail}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover h-full w-full cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-grow flex flex-col justify-between sm:ms-3 mt-2 sm:mt-0">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-electricBlue bg-electricBlue/10 px-2 py-0.5 rounded">
                      {boutiqueItem?.category}
                    </span>
                    <p className="text-2xl font-bold mt-2">
                      {boutiqueItem?.name}
                    </p>
                  </div>
                  <button className="text-2xl text-gray-400 hover:text-white" onClick={close}>
                    <IoMdCloseCircleOutline />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
                  <a
                    href={boutiqueItem?.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm gap-2 bg-white text-black font-semibold px-4 py-2 rounded hover:bg-electricBlue hover:text-white transition-colors"
                  >
                    Checkout <LuExternalLink />
                  </a>
                  <p className="text-2xl font-bold text-electricBlue pe-2">
                    ${boutiqueItem?.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Comments / Reviews Section */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                Comments & Reviews
                <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-300">
                  {reviews.length}
                </span>
              </h3>

              <form onSubmit={handleAddReview} className="relative mb-5">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full bg-[#1A1A1E] text-white border border-gray-700 rounded-lg p-3 pr-12 outline-none focus:border-electricBlue text-sm placeholder:text-gray-500 resize-none min-h-[70px]"
                  placeholder="Share your thoughts about this product..."
                  rows={2}
                />
                <button
                  type="submit"
                  disabled={!commentText.trim() || submitting}
                  className="absolute bottom-4 right-3 text-electricBlue hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 transition-all text-xl"
                  title="Send Comment"
                >
                  <PiPaperPlaneTilt />
                </button>
              </form>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {reviews.length === 0 ? (
                  <p className="text-xs text-gray-500 py-3 text-center">
                    No comments yet. Be the first to share your review!
                  </p>
                ) : (
                  reviews.map((rev) => (
                    <div
                      key={rev._id}
                      className="bg-[#18181B] hover:bg-[#1E1E22] transition-colors rounded-lg p-3 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3 flex-grow">
                        {rev.user?.profile ? (
                          <img
                            src={rev.user.profile}
                            alt={rev.user?.username || "User"}
                            className="w-7 h-7 rounded-full object-cover border border-gray-700"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-electricBlue/20 text-electricBlue font-bold flex items-center justify-center text-xs">
                            {rev.user?.username ? rev.user.username[0].toUpperCase() : "U"}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-snowWhite">
                              {rev.user?.username || "Anonymous"}
                            </span>
                            <span className="text-[10px] text-gray-500">
                              {rev.createdAt
                                ? new Date(rev.createdAt).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-300 text-sm whitespace-pre-wrap">
                            {rev.review}
                          </p>
                        </div>
                      </div>

                      {currentUser && rev.user && currentUser.username === rev.user.username && (
                        <button
                          onClick={() => handleDeleteReview(rev._id)}
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
          </div>
        </div>
      )}
    </>
  );
}

BoutiqueDetails.propTypes = {
  id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default BoutiqueDetails;
