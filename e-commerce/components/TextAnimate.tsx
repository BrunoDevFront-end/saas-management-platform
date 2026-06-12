"use client";

import { useEffect, useState } from "react";

export default function TextAnimate() {
  const text = "Escute sua equipe de verdade.";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const beforeWord = "Escute sua ";
  const greenWord = "equipe";

  const hasGreenWord = displayText.includes(greenWord);

  return (
    <h1 className="text-2xl text-center lg:text-5xl lg:text-start font-bold 2xl:mt-36 xs:text-3xl">
      {!hasGreenWord ? (
        displayText
      ) : (
        <>
          {beforeWord}
          <span className="text-[#c8f55a]">{greenWord}</span>
          {displayText.slice((beforeWord + greenWord).length)}
        </>
      )}
    </h1>
  );
}
