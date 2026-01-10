"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MarqueeProps {
  texts: string[];
}

const Marquee = ({ texts }: MarqueeProps) => {
  return (
    <div className="relative w-full overflow-hidden flex">
      <motion.div
        className="flex whitespace-nowrap item-center"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop" as const,
            duration: 55,
            ease: "linear" as const,
          },
        }}
      >
        {[...texts, ...texts].map((text, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <p className="text-2xl font-cinzel tracking-widest !text-black mx-4 !mb-0">
              {text}
            </p>
            <Image
              src="/star.png"
              alt="star"
              width={30}
              height={30}
              className="mx-4"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
