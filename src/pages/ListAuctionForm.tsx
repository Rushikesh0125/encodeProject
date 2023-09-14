import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers'; // Import ethers
import AuctionContractABI from '@/utils/AuctionABI';
import NFTABI from '@/utils/NFTABI';

function AuctionCreate() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [auctionItem, setAuctionItem] = useState('');
  const [tokenId, setTokenId] = useState('');

  const router = useRouter();

  const handleFormSubmit = async (e:any) => {
    e.preventDefault();

    // Connect to Ethereum using ethers
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = provider.getSigner();
    const userAddress = (await signer).getAddress();

    try {
      // Approve the AuctionFactory contract to transfer tokens from your address
      const auctionFactoryAddress = '0x8F2Cafb392E48a777BA49fB6D18Bc3099cEF8E89'; // Add the address of the AuctionFactory contract here// Add the ABI of the AuctionFactory contract here

      const auctionFactoryContract = new ethers.Contract(
        auctionFactoryAddress,
        AuctionContractABI,
        await signer
      );

      const auctionItemContract = new ethers.Contract(
        auctionItem,
        NFTABI,
        await signer
      )

      await auctionItemContract.approve(auctionFactoryContract, tokenId);

      const response = await auctionFactoryContract.listAuction(
        startTime,
        endTime,
        auctionItem,
        tokenId
      );

      // Handle the response, e.g., show a success message or redirect to a confirmation page
      console.log('Auction listed successfully', response);

      // Redirect to a confirmation page or any other page as needed
      router.push('/auction-confirmation');
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Create Auction</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Start Time (seconds):</label>
          <input
            type="number"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Time (seconds):</label>
          <input
            type="number"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Auction Item Address:</label>
          <input
            type="text"
            value={auctionItem}
            onChange={(e) => setAuctionItem(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Auction Item Token ID:</label>
          <input
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Auction</button>
      </form>
    </div>
  );
}

export default AuctionCreate;
