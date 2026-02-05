'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
import { IoSparklesSharp } from 'react-icons/io5';
import ChatbotModal from './ChatbotModal';

const generateUserId = (): string => {
  const randomNum = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0');
  return `FY${randomNum}`;
};

const getOrCreateUserId = (): string => {
  const STORAGE_KEY = 'GENERATED_UID';

  if (typeof window === 'undefined') return '';

  const existingId = localStorage.getItem(STORAGE_KEY);

  if (existingId) {
    console.log('Welcome back!');
    return existingId;
  }

  const newId = generateUserId();
  localStorage.setItem(STORAGE_KEY, newId);
  console.log('New user ID generated:', newId);
  return newId;
};

const AskAI = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const id = getOrCreateUserId();
    setUserId(id);
  }, []);

  const openChatBotModal = () => {
    setIsModalOpen(true);
  };

  const closeChatBotModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-[2%] right-[2%] z-50 flex flex-col items-center gap-2">
        <h2 className="font-semibold text-sm md:text-base text-white bg-secondary px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg animate-pulse flex items-center gap-1.5 md:gap-2">
          <IoSparklesSharp className="text-white text-xs md:text-sm" />
          Ask AI
        </h2>
        <button
          onClick={openChatBotModal}
          className="relative rounded-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden w-20 h-20 md:w-24 md:h-24 flex items-center justify-center cursor-pointer"
        >
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-[130%] h-[130%] md:w-[140%] md:h-[140%]">
              <DotLottieReact
                src="/assets/lottie/AI bot.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </button>
      </div>

      <ChatbotModal
        isOpen={isModalOpen}
        onClose={closeChatBotModal}
        userId={userId}
      />
    </>
  );
};

export default AskAI;
