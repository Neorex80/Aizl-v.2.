"use client"; // Use client-side rendering
import React from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from Next.js
import ChatArea from '@/components/chat/ChatArea'; // Import ChatArea component
import Home from '@/components/Homepage/Front'; // Import Hero section for homepage

const App = () => {
  const router = useRouter(); // Initialize the router
  const path = router.pathname; // Get the current URL path

  return (
    <>
      {path === '/' ? (
        <Home /> // Render Hero component for the homepage
      ) : (
        <ChatArea onBack={() => router.push('/')} /> // Render ChatArea with back navigation
      )}
    </>
  );
};

export default App;





