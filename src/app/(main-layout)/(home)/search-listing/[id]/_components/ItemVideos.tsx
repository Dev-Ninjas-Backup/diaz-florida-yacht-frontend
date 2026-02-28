import { FaPlayCircle } from 'react-icons/fa';

const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  // Remove whitespace
  url = url.trim();

  // Try different YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/, // youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/, // youtube.com/shorts/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/, // youtu.be/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/, // youtube.com/embed/VIDEO_ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return null;
};

const ItemVideos = ({ videoURL }: { videoURL: string }) => {
  if (!videoURL) return null;

  const embedUrl = getYouTubeEmbedUrl(videoURL);

  return (
    <div className="mt-8 px-1 md:px-4">
      <h2 className="text-lg md:text-xl font-semibold text-black mb-4">
        Video
      </h2>
      <div className="rounded-xl overflow-hidden bg-gray-100 aspect-video">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Boat Video"
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <a
            href={videoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 p-8 group"
          >
            <FaPlayCircle className="text-6xl text-gray-400 group-hover:text-blue-500 transition-colors duration-300 mb-4" />
            <p className="text-gray-600 font-medium mb-2">Video Available</p>
            <p className="text-sm text-blue-600 underline group-hover:text-blue-700">
              Click to Watch
            </p>
          </a>
        )}
      </div>
    </div>
  );
};

export default ItemVideos;
