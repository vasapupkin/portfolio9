"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const [wordsArray, setWordsArray] = useState<string[]>([]);

  useEffect(() => {
    setWordsArray(words.split(" "));
  }, [words]);

  useEffect(() => {
    if (wordsArray.length > 0) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 4,
          delay: stagger(0.4),
        }
      );
    }
  }, [scope.current, wordsArray]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          if (word === 'Bildungsweg,') {
            var href = '#contact';
            return (
              <motion.span
                key={word + idx}
                className="text-purple opacity-0"
              >
                <motion.a href={href}>
                  {word}{" "}
                </motion.a>
              </motion.span>
            );
          } else {
            return (
              <motion.span
                key={word + idx}
                className={`${idx > 333 ? "text-purple" : "dark:text-white text-black"} opacity-0`}
              >
                {word}{" "}
              </motion.span>
            );
          }
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
