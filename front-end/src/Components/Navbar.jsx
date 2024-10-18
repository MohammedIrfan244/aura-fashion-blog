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
          ? "animate-bouncing px-5 backdrop-blur-md z-50 fixed w-screen flex justify-between items-end pb-3"
          : "hidden"
      } transition-all`}
    >
      <div className="flex cursor-pointer">
        <h1 className="text-3xl font-semibold font-agdasima">AURA</h1>
        <PiTrademarkRegisteredBold className="text-electricBlue"/>
      </div>
      {navListVisible && (
        <ul className="sm:flex gap-2 sm:gap-20 text-sm font-semibold hidden">
          <li className="cursor-pointer animate-slideY hover:text-electricBlue transition-all" style={{animationDuration:'600ms',"--tw-translate-y":"15px","--tw-translate-y-70":"0px"}}>HOME</li>
          <li className="cursor-pointer animate-slideY hover:text-electricBlue transition-all" style={{animationDuration:'700ms',"--tw-translate-y":"15px","--tw-translate-y-70":"0px"}}>BOUTIQUE</li>
          <li className="cursor-pointer animate-slideY hover:text-electricBlue transition-all" style={{animationDuration:'800ms',"--tw-translate-y":"15px","--tw-translate-y-70":"0px"}}>STYLES</li>
        </ul>
      )}
      {navListVisible && (
  <div className="relative flex items-end gap-2 sm:gap-7 text-lg animate-slideX" style={{animationDuration:'600ms',"--tw-translate-x":"15px","--tw-translate-x-70":"0px"}}>
    <div
      className={`overflow-hidden transition-all relative flex duration-500 ease-out ${
        searchVisible ? "w-40" : "w-0"
      }`}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search here ..."
        className="w-full placeholder:text-xs text-xs bg-transparent border-2 border-electricBlue pt-[3px] focus:outline-none rounded-3xl ps-3"
      />
    </div>
    <LuSearch
      onClick={() => setSearchVisible(!searchVisible)}
      className="hover:scale-110 cursor-pointer hover:text-electricBlue"
    />
    <LuContact className="hover:scale-110 cursor-pointer hover:text-electricBlue" />
    <LuUser className="hover:scale-110 cursor-pointer hover:text-electricBlue" />
  </div>
)}

    </div>
  );
}

export default Navbar;
