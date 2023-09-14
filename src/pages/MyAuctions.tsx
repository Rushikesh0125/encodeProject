// pages/auctions.tsx
import React from 'react';
import AuctionCard from './components/AuctionCard';

interface Auction {
    id: number;
    startTime: number;
    endTime: number;
    // Add more properties as needed
  }

// Mock data for auctions (replace with your actual data)
const mockAuctions: Auction[] = [
  { id: 1, startTime: 1631558400, endTime: 1631659200 },
  { id: 2, startTime: 1631758400, endTime: 1631859200 },
  // Add more auction objects here
];

const AuctionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">My Auctions</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {mockAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionsPage;
