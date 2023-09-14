import Link from 'next/link';
import { useEffect, useState } from 'react';
import FactoryContractIns from '..//utils/getContractInstance'
import { ethers } from 'ethers';
import AuctionContractABI from '@/utils/AuctionABI';

interface AuctionData {
  address: string;
  status: string;
  id:number;
  currentBid:string;
  itemAddress:string;
}

export default function Home() {
  const [auctionId, setAuctionId] = useState(0);
  const [auctionData, setAuctionData] = useState<AuctionData[]>();
  const [bidVal, setBidVal] = useState('')

  const handleBid = async () => {
    const auctionFactoryAddress = "0x8F2Cafb392E48a777BA49fB6D18Bc3099cEF8E89"
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = provider.getSigner();
    const userAddress = (await signer).getAddress();

    const auctionFactoryContract = new ethers.Contract(
      auctionFactoryAddress,
      AuctionContractABI,
      await signer
    );
    
    const tx = await auctionFactoryContract.bidInSpecificAuction(auctionId, {value:ethers.parseEther(bidVal)});
    
    await tx.wait();

    if(await auctionFactoryContract.getCurrentBid(auctionId) == bidVal){
      console.log("done, bid submitted")
    }

    getActiveAuctions();
  };


  async function getActiveAuctions(): Promise<AuctionData[]> {
    const liveAuctions: AuctionData[] = [];

    // Assuming `auctions` is an array of addresses stored in the contract
    const auctions: string[] = await FactoryContractIns.getActiveAuctions();

    for (let i = 0; i < auctions.length; i++) {
        const auctionAddress = auctions[i];
        const AuctionInstance = new ethers.Contract(auctionAddress,AuctionContractABI,new ethers.BrowserProvider(window.ethereum));
        const aucId = await AuctionInstance.auctionId();
        const curBid = ethers.parseEther(await AuctionInstance.getCurrentBid()).toLocaleString();
        const auctionItemaddress = await AuctionInstance.getAuctionItem();
    
        liveAuctions.push({
          address: auctionAddress,
          status: "Started",
          id:aucId,
          currentBid:curBid,
          itemAddress:auctionAddress,
        });
    }

    return liveAuctions;
  }

  useEffect(() => {
    //Runs only on the first render
    const fun = async() => {
      setAuctionData(await getActiveAuctions());
    }

    fun();
    
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Body */}
      <main className="container mx-auto p-8">
        {/* Auction Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Replace with your actual auction data */}
          {auctionData == null ? <>
            No Live auctions to show
          </> : auctionData.map((auction) => (
            <div
              key={auction.id}
              className="bg-white p-4 rounded shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2" id='aucId'>
                Auction ID: {auction.id}
              </h3>
              <p>Auction address: {auction.address}</p>
              <p>Current Bid: {auction.currentBid}</p>

              {/* Bid Input and Button */}
              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Enter Bid Amount"
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    var element = document.getElementById('aucId')as HTMLInputElement | null;
                    var val = element?.value;
                    setAuctionId(parseInt(val || ""));
                    setBidVal(e.target.value);
                  }}
                />
                <button
                  onClick={handleBid}
                  className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600"
                >
                  Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
