"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const text = [
  {
    id: 1,
    content: [
      "Boosts your productivity with custom Pomodoro sessions.",
      <>
        Upload your music, stay focused, and stay motivated —{" "}
        <i>Your Pomodoro. Your Tune.</i>
      </>,
    ],
  },
  {
    id: 2,
    content: [
      "The Pomodoro Technique is a time management method that uses focused ",
      "work sessions with short breaks to enhance focus and productivity.",
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
      <p className="font-700 4xl:-translate-y-1/3 -translate-y-2/5">PomoPal</p>
      <AnimatePresence>
        <motion.p
          key={text[index].id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ ease: "easeInOut" }}
          className="text-muted-foreground font-300 absolute w-full -translate-y-full text-balance whitespace-pre-line"
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
  );
};
