import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'

// eslint-disable-next-line react/prop-types
function StyleCollectionCard() {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col sm:flex-row relative w-auto h-auto"
    >
      <motion.div
       initial={{ x:-300, opacity: 0 }}
       whileInView={{ x:0, opacity: 1 }}
       transition={{ duration: 0.2, repeat: 0 }}
       className="w-full sm:w-1/2 h-[80vh] sm:h-[100vh]">
        <img
          className="object-cover w-full h-full"
          src={style?.styleImage}
          alt={style?.styleName}
        />
      </motion.div>
      <div className="pt-10 ps-3 w-full sm:w-1/2">
        <p className="flex items-center font-thin">
          FASHION <FaRegHeart className="text-base font-semibold ms-5 me-1" />{" "}
          {style?.likes.length}
        </p>
        <motion.div 
        initial={{ x:100, opacity: 0 }}
        whileInView={{ x:0, opacity: 1 }}
        transition={{ duration: 0.5, repeat: 0 }}
        className="sm:bg-[#242427] sm:absolute sm:top-[10%] sm:left-[45%] overflow-hidden h-auto sm:py-5 w-auto sm:px-20 flex items-center">
          <h2 className="text-2xl sm:text-4xl mt-5 sm:mt-0 font-agdasima">
            {style?.styleName}
          </h2>
        </motion.div>
        <p className="text-snowWhite mt-5 sm:mt-40 font-extralight text-sm">
          By {author}
        </p>
        <p className="text-sm mt-5">{style?.styleDescription}</p>
        <motion.button
          initial={{ scale: 0.5}}
          whileInView={{ scale: 1}}
          transition={{ duration: 0.1, repeat: 0 }}
          onClick={() =>
            navigate(`/styles/${id}`, { state: { style, author } })
          }
          className="text-sm bg-snowWhite transition-all text-richBlack px-5 py-1 mt-5"
        >
          Read The Post
        </motion.button>
      </div>
    </div>
  );
}

export default StyleCollectionCard;
