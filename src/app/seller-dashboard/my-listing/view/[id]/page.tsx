import { getBoatDetails } from '@/services/boats/boat-details';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function BoatViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const boat = await getBoatDetails(id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <Link
            href="/seller-dashboard/my-listing"
            className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
            Back to Listings
          </Link>

          {boat.coverImages.length > 0 && (
            <div className="mb-6">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src={boat.coverImages[0].url || '/placeholder-boat.jpg'}
                  alt={boat.name}
                  fill
                  className="object-cover"
                />
              </div>
              {boat.galleryImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {boat.galleryImages.slice(0, 4).map((img) => (
                    <div
                      key={img.id}
                      className="relative w-full h-20 rounded overflow-hidden"
                    >
                      <Image
                        src={img.url || '/placeholder-boat.jpg'}
                        alt={boat.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{boat.name}</h1>
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  boat.status === 'ACTIVE'
                    ? 'bg-[#E3FBFD] text-[#00A3AC]'
                    : 'bg-[#F4F4F4] text-gray-500'
                }`}
              >
                {boat.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Listing ID: {boat.listingId}
            </p>
            <p className="text-3xl font-bold text-[#006EF0] mt-2">
              ${boat.price.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Year</p>
              <p className="font-semibold">{boat.buildYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Make</p>
              <p className="font-semibold">{boat.make}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Model</p>
              <p className="font-semibold">{boat.model}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Condition</p>
              <p className="font-semibold">{boat.condition}</p>
            </div>
          </div>

          {boat.description && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {boat.description}
              </p>
            </div>
          )}

          {boat.videoURL && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Video</h2>
              <div className="rounded-xl overflow-hidden bg-gray-100 aspect-video">
                {(() => {
                  const url = boat.videoURL.trim();
                  const patterns = [
                    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
                    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
                    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
                    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
                  ];
                  let embedUrl = null;
                  for (const pattern of patterns) {
                    const match = url.match(pattern);
                    if (match && match[1]) {
                      embedUrl = `https://www.youtube.com/embed/${match[1]}`;
                      break;
                    }
                  }
                  return embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title="Boat Video"
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <a
                      href={boat.videoURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 p-8 group"
                    >
                      <svg
                        className="w-16 h-16 text-gray-400 group-hover:text-blue-500 transition-colors duration-300 mb-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                      <p className="text-gray-600 font-medium mb-2">
                        Video Available
                      </p>
                      <p className="text-sm text-blue-600 underline group-hover:text-blue-700">
                        Click to Watch
                      </p>
                    </a>
                  );
                })()}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Length</span>
                  <span className="font-medium">
                    {boat.boatDimensions.lengthFeet}'{' '}
                    {boat.boatDimensions.lengthInches}"
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Beam</span>
                  <span className="font-medium">
                    {boat.boatDimensions.beamFeet}'{' '}
                    {boat.boatDimensions.beamInches}"
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Draft</span>
                  <span className="font-medium">
                    {boat.boatDimensions.draftFeet}'{' '}
                    {boat.boatDimensions.draftInches}"
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-medium">{boat.fuelType}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Class</span>
                  <span className="font-medium">{boat.class}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Material</span>
                  <span className="font-medium">{boat.material}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Cabins</span>
                  <span className="font-medium">{boat.cabinsNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Heads</span>
                  <span className="font-medium">{boat.headsNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {boat.engines.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Engines</h2>
              <div className="space-y-3">
                {boat.engines.map((engine, idx) => (
                  <div key={engine.id} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Engine {idx + 1}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {engine.make && (
                        <div>
                          <span className="text-gray-600">Make: </span>
                          <span className="font-medium">{engine.make}</span>
                        </div>
                      )}
                      {engine.model && (
                        <div>
                          <span className="text-gray-600">Model: </span>
                          <span className="font-medium">{engine.model}</span>
                        </div>
                      )}
                      {engine.horsepower && (
                        <div>
                          <span className="text-gray-600">HP: </span>
                          <span className="font-medium">
                            {engine.horsepower}
                          </span>
                        </div>
                      )}
                      {engine.hours && (
                        <div>
                          <span className="text-gray-600">Hours: </span>
                          <span className="font-medium">{engine.hours}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Location</h2>
            <p className="text-gray-700">
              {boat.city}, {boat.state} {boat.zip}
            </p>
          </div>

          {boat.owner && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Owner</h2>
              <div className="flex items-center gap-3">
                {boat.owner.avatarUrl && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={boat.owner.avatarUrl}
                      alt={boat.owner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{boat.owner.name}</p>
                  <p className="text-sm text-gray-600">{boat.owner.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
