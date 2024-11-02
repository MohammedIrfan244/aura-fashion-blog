import { useLocation } from "react-router-dom";
import GoTopPopUp from "../Shared/GoTopPopUp";


function StyleDetailPage() {
  const location=useLocation()
  const { style ,author} = location.state;
  return (
    <div className="pt-16 px-5">
      <p>{style?.styleDescription}</p>
      <p>{author}</p>
      <div className="w-80 h-80">
        <img src={style?.styleImage} className="object-cover h-full w-full" alt={style?.styleName} />
      </div>
     {
      style.styeleContent[0].styleContentTitle
      }
      <GoTopPopUp/>
    </div>
  );
}

export default StyleDetailPage;
