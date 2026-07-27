"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { motion } from "motion/react";

export type AnyEyeState =
  | "default"
  | "happy-circle"
  | "happy-v"
  | "x"
  | "sleepy";

interface AnyMascotProps {
  className?: string;
  size?: number;
  interactive?: boolean;
  onClick?: () => void;
  welcomeModal?: boolean;
}

const CANVAS = {
  width: 140,
  height: 220,
};

const LAYOUT = {
  head: { x: 23, y: -6, w: 94, h: 74 },
  body: { x: 22, y: 64, w: 96, h: 137 },
  armLeft: { x: 5, y: 80, w: 18, h: 104 },
  armRight: { x: 117, y: 80, w: 17, h: 105 },
  eyesCenter: { x: 47, y: 34 },
};

export default function AnyMascot({
  className = "",
  size = 180,
  interactive = true,
  onClick,
  welcomeModal = false,
}: AnyMascotProps) {
  const [eyeState, setEyeState] = useState<AnyEyeState>("default");
  const [isHovering, setIsHovering] = useState(false);

  const uid = useId();
  const bodyGradId = `anyBodyGrad-${uid}`;
  const visorGradId = `anyVisorGrad-${uid}`;
  const eyeGradId = `anyEyeGrad-${uid}`;

  // Define o estado visual dos olhos enquanto o modal de boas-vindas está aberto.
  const displayedEyeState: AnyEyeState = welcomeModal ? "happy-v" : eyeState;

  // Controla o ciclo automático de piscar do mascote.
  useEffect(() => {
    if (welcomeModal) return;

    let cancelled = false;

    const blinkLoop = async () => {
      while (!cancelled) {
        const wait = 2400 + Math.random() * 2600;

        await new Promise((resolve) => setTimeout(resolve, wait));

        if (cancelled || isHovering) continue;

        setEyeState("sleepy");

        await new Promise((resolve) => setTimeout(resolve, 160));

        if (!cancelled) {
          setEyeState("default");
        }
      }
    };

    blinkLoop();

    return () => {
      cancelled = true;
    };
  }, [isHovering, welcomeModal]);

  const handleHoverStart = useCallback(() => {
    if (!interactive) return;

    setIsHovering(true);

    if (!welcomeModal) {
      setEyeState("happy-circle");
    }
  }, [interactive, welcomeModal]);

  const handleHoverEnd = useCallback(() => {
    setIsHovering(false);

    if (!welcomeModal) {
      setEyeState("default");
    }
  }, [welcomeModal]);

  return (
    <motion.div
      className={`relative aspect-[140/220] w-20 cursor-pointer select-none sm:w-40 lg:w-44 ${className}`}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={onClick}
      animate={{
        y: welcomeModal ? [0, -16, 0] : [0, -10, 0],
      }}
      transition={{
        duration: welcomeModal ? 1.8 : 3.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id={bodyGradId} x1="0" y1="0" x2="1" y2="1">
            {" "}
            <stop offset="0%" stopColor="#C7EE73" />{" "}
            <stop offset="100%" stopColor="#6FA82E" />{" "}
          </linearGradient>
          <linearGradient id={visorGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#212D3A" />
            <stop offset="100%" stopColor="#04060A" />
          </linearGradient>
          <radialGradient id={eyeGradId} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#B9E6FF" />
            <stop offset="100%" stopColor="#2E86D8" />
          </radialGradient>
        </defs>
        <g transform={`translate(${LAYOUT.body.x}, ${LAYOUT.body.y})`}>
          <svg
            width={LAYOUT.body.w}
            height={LAYOUT.body.h}
            viewBox="0 0 96 137"
            fill="none"
          >
            <path
              d="M59.1798 131.184C49.5379 139.073 39.6798 135.017 35.1798 131.184C1.57978 85.9841 -3.82026 24.1841 3.17973 6.6841C15.6797 2.01743 50.9798 -4.5159 92.1798 6.6841C99.3798 23.8841 90.1798 65.8508 84.6798 84.6841C81.6798 94.6841 70.1798 122.184 59.1798 131.184Z"
              fill={`url(#${bodyGradId})`}
              stroke="#5C8F22"
            />

            <ellipse
              cx="30"
              cy="24"
              rx="15"
              ry="24"
              fill="#ffffff"
              opacity="0.16"
              transform="rotate(-16 30 24)"
            />
          </svg>
        </g>
        <g transform={`translate(${LAYOUT.head.x}, ${LAYOUT.head.y})`}>
          <svg
            width={LAYOUT.head.w}
            height={LAYOUT.head.h}
            viewBox="303 -1 94 74"
            fill="none"
          >
            <path
              d="M304.5 42.5014C306.667 49.5014 293.5 65.5014 350.5 72.0014C396 66.0014 396 58.5014 396 42.5014C393.6 10.5014 364.667 1.16807 350.5 0.501404C313.7 4.9014 304.5 30.3347 304.5 42.5014Z"
              fill={`url(#${bodyGradId})`}
              stroke="#5C8F22"
            />

            <ellipse
              cx="340"
              cy="10"
              rx="18"
              ry="7"
              fill="#ffffff"
              opacity="0.14"
              transform="rotate(-8 340 10)"
            />

            <path
              d="M351.511 11.5014C321.017 11.5014 314.178 34.1681 314.511 44.0014V47.0014C329.511 69.8064 380.511 65.0014 386.511 44.0014C386.511 33.0014 379.033 11.5014 351.511 11.5014Z"
              fill={`url(#${visorGradId})`}
              stroke="#233240"
            />
          </svg>

          <g
            transform={`translate(${LAYOUT.eyesCenter.x}, ${LAYOUT.eyesCenter.y})`}
          >
            <EyePair state={displayedEyeState} eyeGradId={eyeGradId} />
          </g>
        </g>
        <g transform={`translate(${LAYOUT.armLeft.x}, ${LAYOUT.armLeft.y})`}>
          <motion.g
            animate={{ rotate: [-2, 2, -2] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originX: 0.5, originY: 0 }}
          >
            <svg
              width={LAYOUT.armLeft.w}
              height={LAYOUT.armLeft.h}
              viewBox="0 0 18 104"
              fill="none"
            >
              <path
                d="M12.3314 100.5C-7.2686 40.5 1.8314 8.83333 8.8314 0.5C10.4981 0.5 16.4308 3.28968 15.3314 14.5C12.1142 47.3047 17.8314 88.5 16.8314 98C16.0314 105.6 13.4981 102.833 12.3314 100.5Z"
                fill={`url(#${bodyGradId})`}
                stroke="#5C8F22"
                strokeWidth="0.75"
              />
            </svg>
          </motion.g>
        </g>
        <g transform={`translate(${LAYOUT.armRight.x}, ${LAYOUT.armRight.y})`}>
          <motion.g
            animate={{ rotate: [2, -2, 2] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            style={{ originX: 0.5, originY: 0 }}
          >
            <svg
              width={LAYOUT.armRight.w}
              height={LAYOUT.armRight.h}
              viewBox="0 0 17 105"
              fill="none"
            >
              <path
                d="M5.09903 100.586C23.599 46.0858 15.599 10.7525 8.59903 0.585815C6.43237 1.25248 2.09903 4.98581 2.09903 14.5858C6.59903 46.0858 -0.400966 87.0858 0.599034 98.0858C1.39903 106.886 3.93237 103.419 5.09903 100.586Z"
                fill={`url(#${bodyGradId})`}
                stroke="#5C8F22"
                strokeWidth="0.75"
              />
            </svg>
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}

function EyePair({
  state,
  eyeGradId,
}: {
  state: AnyEyeState;
  eyeGradId: string;
}) {
  const strokeColor = "#3B9FE0";

  switch (state) {
    case "happy-circle":
      return (
        <g transform="translate(-24, -6.5)">
          {" "}
          <path
            d="M1.50008 11.0635C2.50008 -1.43656 17.0001 -1.93655 18.5001 11.0635"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M29.5001 11.0635C30.5001 -1.43656 45.0001 -1.93655 46.5001 11.0635"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );

    case "happy-v":
      return (
        <g transform="translate(-25.5, -7.5)">
          <path
            d="M20.2779 12.699L12.7301 2.78825C11.9297 1.73725 10.3483 1.73725 9.54786 2.78825L2.00009 12.699"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M49.0001 12.699L41.4523 2.78825C40.6519 1.73725 39.0705 1.73725 38.2701 2.78825L30.7223 12.699"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      );

    case "x":
      return (
        <g transform="translate(-21, -8.5)">
          <path
            d="M1.06067 1.06066L15.5607 15.5607"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M15.5607 1.06066L1.06067 15.5607"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M26.0607 1.06066L40.5607 15.5607"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M40.5607 1.06066L26.0607 15.5607"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );

    case "sleepy":
      return (
        <g transform="translate(-23.5, -1.5)">
          <line
            x1="1.5"
            y1="1.5"
            x2="16.5"
            y2="1.5"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <line
            x1="30.5"
            y1="1.5"
            x2="45.5"
            y2="1.5"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      );

    default:
      return (
        <g transform="translate(-24.5, -7)">
          <ellipse
            cx="9.5"
            cy="7"
            rx="9.5"
            ry="7"
            fill={`url(#${eyeGradId})`}
          />

          <ellipse
            cx="39.5"
            cy="7"
            rx="9.5"
            ry="7"
            fill={`url(#${eyeGradId})`}
          />

          <circle cx="6.5" cy="4" r="2.2" fill="#ffffff" opacity="0.9" />

          <circle cx="36.5" cy="4" r="2.2" fill="#ffffff" opacity="0.9" />
        </g>
      );
  }
}
