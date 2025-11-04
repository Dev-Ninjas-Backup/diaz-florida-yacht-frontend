"use client";

import React, { useState } from 'react';
import { IoSparklesSharp } from 'react-icons/io5';
import ChatbotModal from './ChatbotModal';

const AskAI = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openChatBotModal = () => {
        setIsModalOpen(true);
    };

    const closeChatBotModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button 
                onClick={openChatBotModal} 
                className='fixed bottom-[2%] right-[2%] z-50 p-3 md:p-5 rounded-full bg-white border border-gray-200 shadow-lg flex flex-col justify-center items-center gap-1 md:gap-2 hover:shadow-xl transition-shadow duration-200'
            >
                <IoSparklesSharp className='text-[#004DAC] text-xl' /> 
                <span className='font-semibold text-sm md:text-base'>Ask AI</span>
            </button>

            <ChatbotModal isOpen={isModalOpen} onClose={closeChatBotModal} />
        </>
    );
};

export default AskAI;