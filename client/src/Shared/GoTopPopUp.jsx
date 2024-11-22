import { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md";

function GoTopPopUp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
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
          ? "z-40 flex fixed bottom-5 right-[48.5%] cursor-pointer text-electricBlue font-bold border-2 border-electricBlue w-10 items-center justify-center transition-all ease-in-out animate-circGrow"
          : "hidden"
      }`}
      style={{
        animationDuration: "500ms"
      }}
    >
      <MdArrowUpward onClick={scrollTop} />
    </div>
  );
}

export default GoTopPopUp;
