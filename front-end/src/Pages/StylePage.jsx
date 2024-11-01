import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GoTopPopUp from "../Shared/GoTopPopUp";
import { useLocation } from "react-router-dom";

function StylePage() {
  const { styles } = useSelector((state) => state.styles);
  const [showStyles, setShowStyles] = useState([]);
  const location = useLocation();
  const { stylesIndex } = location.state || {};
  const [selectedIndex, setSelectedIndex] = useState(
    stylesIndex || stylesIndex == 0 ? parseInt(stylesIndex) : null
  );

  useEffect(() => {
    if (selectedIndex === null) {
      const allStylePosts = styles?.flatMap((item) => item.stylePosts || []);
      setShowStyles(allStylePosts);
    } else {
      const selectedStylePosts = styles[selectedIndex]?.stylePosts || [];
      setShowStyles(selectedStylePosts);
    }
  }, [styles, selectedIndex]);

  const handleIndexChange = (e) => {
    const value = e.target.value;
    setSelectedIndex(value === "" ? null : parseInt(value));
  };

  return (
    <div className="pt-16">
      <h1>Styles</h1>

      <div>
        <select
          className="bg-richBlack"
          onChange={handleIndexChange}
          value={selectedIndex ?? ""}
        >
          <option value="">All Styles</option>
          {styles?.map((style, index) => (
            <option key={index} value={index}>
              {style.name}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {showStyles?.map((style, index) => (
          <li key={index}>
            <h2>{style.styleName}</h2>
            <img src={style.styleImage} alt={style.styleName} />
            <p>Author ID: {style.styleAuthorId}</p>
            <p>likes:{style.likes}</p>
            <div>
              {style.styeleContent?.map((content, contentIndex) => (
                <div key={contentIndex}>
                  <h3>{content.styleContentTitle}</h3>
                  <p>{content.styleContentDetails}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <GoTopPopUp />
    </div>
  );
}

export default StylePage;
