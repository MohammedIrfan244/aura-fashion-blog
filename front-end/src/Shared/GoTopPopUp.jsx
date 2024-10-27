import { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md";

function GoTopPopUp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisiblity = () => {
      if (window.scrollY > window.innerHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisiblity);
    return () => window.removeEventListener("scroll", toggleVisiblity);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`${
        visible
          ? "z-40 flex fixed bottom-5 right-[48.5%] cursor-pointer text-electricBlue font-bold border-2 border-electricBlue w-10 items-center justify-center transition-all ease-in-out animate-slideY"
          : "hidden"
      }`}
      style={{
        animationDuration: "300ms",
        "--tw-translate-y": "50px",
        "--tw-translate-y-70": "0px",
      }}
    >
      <MdArrowUpward onClick={scrollTop} />
    </div>
  );
}

export default GoTopPopUp;
