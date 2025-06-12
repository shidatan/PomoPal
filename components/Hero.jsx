"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const text = [
  {
    id: 1,
    content: [
      "PomoPal boosts your productivity with custom Pomodoro sessions.",
      <>
        Upload your music, stay focused, and stay motivated —{" "}
        <i>Your Pomodoro. Your Tune.</i>
      </>,
    ],
  },
  {
    id: 2,
    content: [
      "The Pomodoro Technique is a time management method that uses focused work sessions with short breaks to enhance focus and productivity.",
    ],
  },
];

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => {
        if (prev >= text.length - 1) return 0;
        return prev + 1;
      });
    }, 7500);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <p className="tertiaryFontScale -translate-y-1/2 3xl:text-red-500">PomoPal</p>
      <div className="text-muted-foreground negativeFontScale max-w-[352px] text-balance xl:max-w-md 2xl:max-w-xl">
        <AnimatePresence>
          <motion.p
            key={text[index].id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ ease: "easeInOut" }}
            className="absolute -translate-y-full whitespace-pre-line"
          >
            {text[index].content.map((line, i) => (
              <span key={i}>
                {line}
                {i < text[index].content.length - 1 && <br />}
              </span>
            ))}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
