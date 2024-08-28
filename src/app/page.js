"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from Next.js
import ChatArea from '@/components/chat/ChatArea';

const App = () => { 
  const router = useRouter(); // Initialize the router

  return (
    <>
      <ChatArea onBack={() => router.push('/')} /> {/* Pass onBack function to ChatArea */}
    </>
  );
};

export default App;
