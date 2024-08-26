"use client"; 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DynamicPlaceholderInput } from './DynamicPlaceholderInput';
import './Hero.css';

const Hero = () => {
  const [currentWord, setCurrentWord] = useState('Create');
  const words = ['Create', 'Innovate', 'Transform'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prevWord => {
        const currentIndex = words.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % words.length;
        return words[nextIndex];
      });
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a JavaScript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    console.log("Input changed:", e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("Form submitted");
  };

  return (
    <div className="hero">
       <div className="hero__content">
        <motion.h1
          className="hero__heading"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="highlight"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Explore
          </motion.span>{' '}
          the{' '}
          <motion.span
            className="highlight"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Future
          </motion.span>{' '}
          of AI
          <br />
          <motion.span
            className="highlight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {currentWord}
          </motion.span>
        </motion.h1>
      </div>
      <div className="hero__input">
        <DynamicPlaceholderInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Hero;
