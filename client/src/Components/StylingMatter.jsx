import { motion } from "framer-motion";

function StylingMatter() {
  return (
    <div className="mt-14 sm:mt-20 flex-col sm:flex-row flex justify-between items-center bg-[#242427]">
      <motion.div
        whileInView={{ x: 0, opacity: 1 }}
        initial={{ x: -100, opacity: 0 }}
        transition={{
          duration: 0.3,
          repeat: 0,
        }}
        className="w-[95%] h-[500px] sm:w-[30%] overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src="https://i.pinimg.com/736x/0f/65/e3/0f65e3cd143997a2ce832e361d5fceb3.jpg"
          alt=""
        />
      </motion.div>
      <div className="w-[95%] mt-5 sm:mt-0 sm:w-[50%] ">
        <motion.p
          whileInView={{  opacity: 1 }}
          initial={{  opacity: 0 }}
          transition={{
            duration: 0.3,
            repeat: 0,
          }}
         className="text-2xl font-agdasima ">Styling vs Wearing</motion.p>
        <motion.p
          whileInView={{  opacity: 1 }}
          initial={{  opacity: 0 }}
          transition={{
            duration: 0.6,
            repeat: 0,
          }}
         className="text-sm mt-10 type pe-5">
          Styling and wearing are two intertwined yet distinct aspects of
          fashion. Wearing simply involves putting on clothing and accessories,
          focusing on practicality, comfort, or fulfilling a basic need, such as
          staying warm or adhering to a dress code. It is the foundation of how
          we present ourselves, often influenced by personal habits, culture, or
          necessity. Styling, however, is an intentional and creative process
          that transforms wearing into a form of self-expression. It involves
          thoughtfully curating outfits, pairing items to create balance or
          contrast, and incorporating elements like color, texture, accessories,
          and even attitude to convey a specific mood, personality, or
          aesthetic. Styling reflects one&apos;s unique perspective and often
          tells a story, turning everyday clothing into a statement or art.
          While wearing is functional, styling adds meaning, personality, and
          individuality, making fashion a medium of communication and
          creativity.
        </motion.p>
        <ul className="mt-5 text-sm hidden sm:block space-y-5">
          <motion.li
            whileInView={{  opacity: 1 }}
            initial={{  opacity: 0 }}
            transition={{
              duration: 0.9,
              repeat: 0,
            }}
          >
            <span className="font-semibold">Understand Your Fit</span> : Choose
            clothes that complement your body shape. Properly fitted garments
            enhance your silhouette and provide a polished look.
          </motion.li>
          <motion.li
            whileInView={{  opacity: 1 }}
            initial={{  opacity: 0 }}
            transition={{
              duration: 0.6,
              repeat: 0,
            }}
          >
            <span className="font-semibold">Consider Color Coordination</span> :
            Opt for colors that suit your skin tone and balance bold patterns
            with neutral pieces to avoid clashing.
          </motion.li>
          <motion.li
            whileInView={{  opacity: 1 }}
            initial={{  opacity: 0 }}
            transition={{
              duration: 0.3,
              repeat: 0,
            }}
          >
            <span className="font-semibold">Avoid Too Many Trends at Once</span>{" "}
            : Following every trend can make your outfit look chaotic.
            Incorporate trends subtly while sticking to your personal style.
          </motion.li>
        </ul>
      </div>
    </div>
  );
}

export default StylingMatter;
