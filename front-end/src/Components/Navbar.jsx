import { useEffect, useRef, useState } from "react";
import { LuContact, LuSearch, LuUser } from "react-icons/lu";
import { PiTrademarkRegisteredBold } from "react-icons/pi";

function Navbar() {
  const [navListVisible, setNavListVisible] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [searchVisible, setSearchVisible] = useState(false);
  const inputRef = useRef();

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) {
      setScrollVisible(false);
    } else {
      setScrollVisible(true);
    }
    setLastScroll(currentScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScroll]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNavListVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Focus input when searchVisible becomes true
  useEffect(() => {
    if (searchVisible) {
      inputRef.current.focus(); // Ensure input is focused after it's rendered
    }
  }, [searchVisible]);

  return (
    <div
      className={`${
        scrollVisible
          ? "animate-bouncing px-5 backdrop-blur-md bg-lavendarBlush bg-opacity-40 fixed w-screen shadow-sm flex justify-between items-end pb-3"
          : "hidden"
      } transition-all`}
    >
      <div className="flex cursor-pointer">
        <h1 className="text-3xl font-semibold font-agdasima">AURA</h1>
        <PiTrademarkRegisteredBold />
      </div>
      {navListVisible && (
        <ul className="flex justify-between w-60 animate-slideUp">
          <li className="hover:font-medium cursor-pointer">HOME</li>
          <li className="hover:font-medium cursor-pointer">BOUTIQUE</li>
          <li className="hover:font-medium cursor-pointer">STYLES</li>
        </ul>
      )}
      {navListVisible && (
  <div className="relative flex items-end gap-5 text-lg animate-slideLeft">
    <div
      className={`overflow-hidden transition-all duration-500 ease-out ${
        searchVisible ? "w-52" : "w-0"
      }`}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search here ..."
        className="w-full placeholder:text-gray-600 placeholder:text-xs focus:outline-none border-b-[1px] border-richBlack ps-2"
      />
    </div>
    <LuSearch
      onClick={() => setSearchVisible(!searchVisible)}
      className="hover:scale-110 cursor-pointer"
    />
    <LuContact className="hover:scale-110 cursor-pointer" />
    <LuUser className="hover:scale-110 cursor-pointer" />
  </div>
)}

    </div>
  );
}

export default Navbar;
