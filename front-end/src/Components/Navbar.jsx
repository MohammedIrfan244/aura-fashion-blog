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
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchVisible) {
      inputRef.current.focus();
    }
  }, [searchVisible]);

  return (
    <div
      className={`${
        scrollVisible
          ? "animate-bouncing px-5 backdrop-blur-md z-50 bg-lavendarBlush bg-opacity-40 fixed w-screen shadow-sm flex justify-between items-end pb-3"
          : "hidden"
      } transition-all`}
    >
      <div className="flex cursor-pointer">
        <h1 className="text-3xl font-semibold font-agdasima">AURA</h1>
        <PiTrademarkRegisteredBold />
      </div>
      {navListVisible && (
        <ul className="flex gap-5 text-sm font-semibold">
          <li className="cursor-pointer animate-slideUp hover:shadow-sm" style={{animationDuration:'600ms'}}>HOME</li>
          <li className="cursor-pointer animate-slideUp hover:shadow-sm" style={{animationDuration:'800ms'}}>BOUTIQUE</li>
          <li className="cursor-pointer animate-slideUp hover:shadow-sm" style={{animationDuration:'1000ms'}}>STYLES</li>
        </ul>
      )}
      {navListVisible && (
  <div className="relative flex items-end gap-5 text-lg animate-slideLeft">
    <div
      className={`overflow-hidden transition-all relative flex duration-500 ease-out ${
        searchVisible ? "w-52" : "w-0"
      }`}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search here ..."
        className="w-full placeholder:text-gray-600 placeholder:text-xs text-xs pt-[2px] focus:outline-none rounded-3xl ps-2"
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
