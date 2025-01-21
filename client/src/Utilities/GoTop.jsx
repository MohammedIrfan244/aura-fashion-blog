import { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md";
import topUpImage from "../images/scrollTop.jpg";

function GoTopPopUp() {
  const [visible, setVisible] = useState(false);
  let timeout;

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const handleMouseOrScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setVisible(true);
        clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timeout = setTimeout(() => {
          setVisible(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("mousemove", handleMouseOrScroll);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("mousemove", handleMouseOrScroll);
      clearTimeout(timeout);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollTop}
      className={`${
        visible
          ? `z-40 fixed bottom-5 right-5 rounded-2xl cursor-pointer text-snowWhite font-bold border-2 border-snowWhite w-16 h-5 items-center justify-center transition-all ease-in-out animate-circGrow object-cover overflow-hidden`
          : "hidden"
      }`}
      style={{
        backgroundImage: `url(${topUpImage})`,
        animationDuration: "500ms",
      }}
    >
      <MdArrowUpward />
    </div>
  );
}

export default GoTopPopUp;
