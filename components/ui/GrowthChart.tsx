"use client";

import { motion } from "framer-motion";

type Props = {
  className?: string;
  bars?: number[];
};

const DEFAULT_BARS = [22, 30, 26, 44, 38, 58, 52, 78, 68, 92, 84, 100];

export default function GrowthChart({ className = "", bars = DEFAULT_BARS }: Props) {
  const width = 320;
  const height = 140;
  const gap = 6;
  const barWidth = width / bars.length - gap;

  const points = bars
    .map((v, i) => {
      const x = i * (barWidth + gap) + barWidth / 2;
      const y = height - (v / 100) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height + 10}`}
      className={className}
      role="img"
      aria-label="График роста заявок"
    >
      {bars.map((v, i) => {
        const x = i * (barWidth + gap);
        const barHeight = (v / 100) * height;
        return (
          <motion.rect
            key={i}
            x={x}
            width={barWidth}
            rx={2}
            fill="url(#barGradient)"
            initial={{ height: 0, y: height }}
            whileInView={{ height: barHeight, y: height - barHeight }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
          />
        );
      })}
      <motion.polyline
        points={points}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#760000" />
          <stop offset="100%" stopColor="#E10600" />
        </linearGradient>
      </defs>
    </svg>
  );
}
