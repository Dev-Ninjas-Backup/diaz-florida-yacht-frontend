'use client';
import ChatbotModal from '@/components/shared/main/AskAI/ChatbotModal';
import { submitContactOwner } from '@/services/contact';
import React, { useEffect, useRef, useState } from 'react';
import { IoSparklesSharp } from 'react-icons/io5';
import { toast } from 'sonner';

interface SendMessageProps {
  listingId: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ listingId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [topOffset, setTopOffset] = useState<string>('1rem');
  const [bottomOffset, setBottomOffset] = useState<string | undefined>(
    undefined,
  );
  const [shouldScrollWithContent, setShouldScrollWithContent] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const STORAGE_KEY = 'GENERATED_UID';
    if (typeof window !== 'undefined') {
      const existingId = localStorage.getItem(STORAGE_KEY);
      if (existingId) {
        setUserId(existingId);
      } else {
        const randomNum = Math.floor(Math.random() * 1000000000)
          .toString()
          .padStart(9, '0');
        const newId = `FY${randomNum}`;
        localStorage.setItem(STORAGE_KEY, newId);
        setUserId(newId);
      }
    }
  }, []);

  useEffect(() => {
    const calculateTopOffset = () => {
      if (typeof window === 'undefined') return;

      let banner = document.querySelector(
        '[class*="bg-linear-to-b"]',
      ) as HTMLElement;

      if (!banner) {
        const fixedElements = Array.from(
          document.querySelectorAll('div[class*="fixed"]'),
        );
        banner = fixedElements.find(
          (el) => window.getComputedStyle(el).zIndex === '50',
        ) as HTMLElement;
      }

      if (banner) {
        const bannerRect = banner.getBoundingClientRect();
        const bannerBottom = bannerRect.bottom;

        setTopOffset(`${bannerBottom + 16}px`);
      } else {
        setTopOffset('1rem');
      }
    };

    const handleScroll = () => {
      if (
        typeof window === 'undefined' ||
        !formRef.current ||
        window.innerWidth < 768
      ) {
        return;
      }

      calculateTopOffset();

      const footer = document.querySelector('footer');
      if (!footer) {
        setBottomOffset(undefined);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        setShouldScrollWithContent(true);
        setBottomOffset(undefined);
      } else {
        setShouldScrollWithContent(false);
        setBottomOffset(undefined);
      }
    };

    const handleResize = () => {
      calculateTopOffset();
      handleScroll();
    };

    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      calculateTopOffset();
      handleScroll();

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      toast.error('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      await submitContactOwner({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: 'FLORIDA',
        type: 'INDIVIDUAL_LISTING',
        listingId: listingId,
        listingSource: 'custom',
      });

      toast.success('Message sent successfully!');

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAskAI = () => {
    setIsChatbotOpen(true);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <>
      <div
        ref={formRef}
        className={`max-w-lg z-20 w-full bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 my-4 ${
          shouldScrollWithContent ? 'md:relative' : 'md:fixed'
        }`}
        style={{
          top:
            typeof window !== 'undefined' &&
            window.innerWidth >= 768 &&
            !shouldScrollWithContent
              ? topOffset
              : undefined,
          bottom: bottomOffset,
        }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Contact Owner
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email address"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Your phone number"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Write message..."
            rows={4}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            required
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary hover:bg-[#0052CC] text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <button
          type="button"
          onClick={handleAskAI}
          className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-base"
        >
          <IoSparklesSharp size={20} />
          Ask AI
        </button>
      </div>

      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={handleCloseChatbot}
        userId={userId}
      />
    </>
  );
};

export default SendMessage;
