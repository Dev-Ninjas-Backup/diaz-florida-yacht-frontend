import logo from '@/assets/login-logo.svg';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8 animate-pulse">
          <Image
            src={logo}
            alt="Florida Yacht"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
        <p className="mt-6 text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
