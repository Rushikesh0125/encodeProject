import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers'; // Import ethers
import Link from 'next/link';

const Header = (props: { connectWallet: any; walletAddress: any; }) => {
    
    const {connectWallet, walletAddress} = props

    return(
        <header className="bg-blue-500 p-4 flex justify-between items-center">
        <div className="text-white">
          {/* Links to Page 1, Page 2, and Page 3 */}
          <Link href="/Home" className="mr-4">
            Home
          </Link>
          <Link href="/MyAuctions" className="mr-4">
            My Auctions
          </Link>
          <Link href="/ListAuction" className="mr-4">
            List A Auction
          </Link>
        </div>
        <div>
          {/* Connect Wallet button */}
          {walletAddress == null ? <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => connectWallet()}>
            Connect Wallet
          </button> :
            <h3>{walletAddress}</h3>
          }
          
        </div>
      </header>
    )
}

export default Header