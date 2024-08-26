"use client";
import React from 'react';
import { BentoGrid, BentoGridItem } from './BentoGrid'; // Adjust the import path if necessary
import { IconBoxAlignRightFilled, IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn, IconCode } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const SkeletonOne = () => {
    const variants = {
      initial: {
        x: 0,
        rotate: 0,
      },
      animate: {
        x: 10,
        rotate: 5,
        transition: {
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    };
  
    const variantsSecond = {
      initial: {
        x: 0,
        rotate: 0,
      },
      animate: {
        x: -10,
        rotate: -5,
        transition: {
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    };
  
    return (
      <motion.div
        initial="initial"
        animate="animate"
        className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-800 to-gray-900 flex-col space-y-2 p-4 rounded-lg"
      >
        <motion.div
          variants={variants}
          className="flex flex-row rounded-full border border-neutral-700 p-2 items-center space-x-2 bg-gray-700"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
          <div className="w-full bg-gray-600 h-5 rounded-full" />
        </motion.div>
        <motion.div
          variants={variantsSecond}
          className="flex flex-row rounded-full border border-neutral-700 p-2 items-center space-x-2 w-3/4 ml-auto bg-gray-700"
        >
          <div className="w-full bg-gray-600 h-5 rounded-full" />
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        </motion.div>
      </motion.div>
    );
  };
  
  const SkeletonTwo = () => {
    const variants = {
      initial: {
        width: 0,
      },
      animate: {
        width: "100%",
        transition: {
          duration: 0.2,
        },
      },
      hover: {
        width: ["0%", "100%"],
        transition: {
          duration: 2,
        },
      },
    };
  
    const arr = new Array(6).fill(0);
  
    return (
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {arr.map((_, i) => (
          <motion.div
            key={"skeleton-two-" + i}
            variants={variants}
            style={{
              maxWidth: Math.random() * (100 - 40) + 40 + "%",
            }}
            className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-gray-800 dark:bg-black w-full h-4"
          ></motion.div>
        ))}
      </motion.div>
    );
 }; 
  const SkeletonThree = () => {
    const variants = {
      initial: {
        backgroundPosition: "0 50%",
      },
      animate: {
        backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
      },
    };
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
        style={{
          background:
            "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
          backgroundSize: "400% 400%",
        }}
      >
        <motion.div className="h-full w-full rounded-lg"></motion.div>
      </motion.div>
    );
  };
  const SkeletonFour = () => {
    const first = {
      initial: {
        x: 20,
        rotate: -5,
      },
      hover: {
        x: 0,
        rotate: 0,
      },
    };
  
    const second = {
      initial: {
        x: -20,
        rotate: 5,
      },
      hover: {
        x: 0,
        rotate: 0,
      },
    };
  
    return (
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-800 to-gray-900 flex-row space-x-4 p-4 rounded-lg"
      >
        <motion.div
          variants={first}
          className="h-full w-1/3 rounded-2xl bg-gray-800 p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-700 flex flex-col items-center justify-center"
        >
          <p className="sm:text-sm text-xs text-center font-semibold text-neutral-400 mt-4">
            Just code in Vanilla Javascript
          </p>
          <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
            Delusional
          </p>
        </motion.div>
        <motion.div
          className="h-full w-1/3 rounded-2xl bg-gray-800 p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-700 flex flex-col items-center justify-center"
        >
          <p className="sm:text-sm text-xs text-center font-semibold text-neutral-400 mt-4">
            Tailwind CSS is cool, you know
          </p>
          <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
            Sensible
          </p>
        </motion.div>
        <motion.div
          variants={second}
          className="h-full w-1/3 rounded-2xl bg-gray-800 p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-700 flex flex-col items-center justify-center"
        >
          <p className="sm:text-sm text-xs text-center font-semibold text-neutral-400 mt-4">
            I love angular, RSC, and Redux.
          </p>
          <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
            Helpless
          </p>
        </motion.div>
      </motion.div>
    );
  };
 
  const SkeletonFive = () => {
    const variants = {
      initial: {
        x: 0,
      },
      animate: {
        x: 10,
        rotate: 5,
        transition: {
          duration: 0.2,
        },
      },
    };
  
    const variantsSecond = {
      initial: {
        x: 0,
      },
      animate: {
        x: -10,
        rotate: -5,
        transition: {
          duration: 0.2,
        },
      },
    };
  
    return (
      <motion.div
        initial="initial"
        whileHover="animate"
        className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-800 to-gray-900 flex-col space-y-2 p-4 rounded-lg"
      >
        <motion.div
          variants={variants}
          className="flex flex-row rounded-2xl border border-neutral-700 dark:border-white/[0.2] p-2 items-start space-x-2 bg-gray-800"
        >
          <p className="text-xs text-neutral-400">
            There are a lot of cool frameworks out there like React, Angular, Vue, Svelte that can make your life ....
          </p>
        </motion.div>
        <motion.div
          variants={variantsSecond}
          className="flex flex-row rounded-full border border-neutral-700 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-gray-800"
        >
          <p className="text-xs text-neutral-400">Use PHP.</p>
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
        </motion.div>
      </motion.div>
    );
  };
   
  const SkeletonSix = () => {
    return (
      <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-800 to-gray-900 flex-col space-y-2 p-4 rounded-lg items-center justify-center">
        <div className="flex items-center justify-center w-full h-full">
          <IconCode className="h-12 w-12 text-gray-500" />
        </div>
      </div>
    );
  };
  
const items = [
  {
    title: "AI Content Generation",
    description: "Experience the power of AI in generating unique content.",
    header: <SkeletonOne />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automated Proofreading",
    description: "Let AI handle the proofreading of your documents.",
    header: <SkeletonTwo />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contextual Suggestions",
    description: "Get AI-powered suggestions based on your writing context.",
    header: <SkeletonThree />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sentiment Analysis",
    description: "Understand the sentiment of your text with AI analysis.",
    header: <SkeletonFour />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Text Summarization",
    description: "Summarize your lengthy documents with AI technology.",
    header: <SkeletonFive />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Code Generation",
    description: "Generate code snippets effortlessly with AI assistance.",
    header: <SkeletonSix />,
    icon: <IconCode className="h-4 w-4 text-neutral-500" />, // Use an appropriate icon for code generation
  },  
];

const AgentsShowcase = () => {
  return (
    <BentoGrid className="my-8">
      {items.map((item, index) => (
        <BentoGridItem
          key={index}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
};

export default AgentsShowcase;
