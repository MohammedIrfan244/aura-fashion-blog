import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function StyleCollectionCard({ style = {} ,id}) {
  const {users}=useSelector(state=>state.users)
    const navigate=useNavigate()
    const getUserNameById = () => {
      const user = users.find(user => user.id == style?.styleAuthorId);
      return user ? user.userName.toUpperCase() : null;
    };
    const author=getUserNameById()
  return (
    <div className="flex flex-col sm:flex-row relative w-auto h-auto animate-slideX"
    style={{
        animationDuration: `500ms`,
        "--tw-translate-x": "-70px",
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
          FASHION <FaRegHeart  className="text-base font-semibold ms-5 me-1" />{" "}
          {style?.likes}
        </p>
        <div className="sm:bg-[#242427] sm:absolute sm:top-[10%] sm:left-[45%] h-auto sm:py-5 w-auto sm:px-20 flex items-center">
          <h2 className="text-2xl sm:text-4xl mt-5 sm:mt-0 font-agdasima">{style?.styleName}</h2>
        </div>
        <p className="text-snowWhite mt-5 sm:mt-40 font-extralight text-sm">By {author}</p>
        <p className="text-sm mt-5">{style?.styleDescription}</p>
        <button onClick={()=>navigate(`/styles/${id}`,{state:{style,author}})} className="text-sm bg-snowWhite animate-circGrow transition-all text-richBlack px-5 py-1 mt-5" style={{animationDuration:'600ms'}}>Read The Post</button>
      </div>
    </div>
  );
}

export default StyleCollectionCard;
