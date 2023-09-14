// AuctionCard.tsx
import React from 'react';

interface Auction {
  id: number;
  startTime: number;
  endTime: number;
  // Add more properties as needed
}

interface AuctionCardProps {
  auction: Auction;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Auction #{auction.id}</h2>
      <p className="text-sm text-gray-600">
        Start Time: {new Date(auction.startTime * 1000).toLocaleString()}
      </p>
      <p className="text-sm text-gray-600">
        End Time: {new Date(auction.endTime * 1000).toLocaleString()}
      </p>
      {/* Add more auction details as needed */}
    </div>
  );
};

export default AuctionCard;
