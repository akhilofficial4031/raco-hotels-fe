"use client";

import { motion } from "framer-motion";

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  fadeRight: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1, transition: { duration: 0.8 } },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
  zoomOut: {
    initial: { opacity: 0, scale: 1.2 },
    whileInView: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
  slideInUp: {
    initial: { y: "100%" },
    whileInView: {
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  },
  slideInDown: {
    initial: { y: "-100%" },
    whileInView: {
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  },
  slideInLeft: {
    initial: { x: "-100%" },
    whileInView: {
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  },
  slideInRight: {
    initial: { x: "100%" },
    whileInView: {
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  },
  bounce: {
    initial: { y: -20 },
    whileInView: {
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 10,
        duration: 0.8,
      },
    },
  },
  flip: {
    initial: { rotateY: 90 },
    whileInView: { rotateY: 0, transition: { duration: 0.6 } },
  },
  rotate: {
    initial: { rotate: -90, opacity: 0 },
    whileInView: { rotate: 0, opacity: 1, transition: { duration: 0.6 } },
  },
  // Add more variants if needed
};

interface AnimatedContainerProps {
  animationName:
    | "fadeUp"
    | "fadeLeft"
    | "fadeDown"
    | "fadeRight"
    | "fadeIn"
    | "zoomIn"
    | "zoomOut"
    | "slideInUp"
    | "slideInDown"
    | "slideInLeft"
    | "slideInRight"
    | "bounce"
    | "flip"
    | "rotate";
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedContainer({
  animationName,
  children,
  delay,
}: AnimatedContainerProps) {
  const selectedVariant = variants[animationName] || variants.fadeUp;

  const variant = delay
    ? {
        ...selectedVariant,
        whileInView: {
          ...selectedVariant.whileInView,
          transition: {
            ...selectedVariant.whileInView.transition,
            delay,
          },
        },
      }
    : selectedVariant;

  return (
    <motion.div
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.3 }}
      variants={variant}
    >
      {children}
    </motion.div>
  );
}
