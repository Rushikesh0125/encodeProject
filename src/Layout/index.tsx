import React, { Children, useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers'; // Import ethers
import Link from 'next/link';
import Header from './Header'

type MyComponentProps = React.PropsWithChildren<{}>;

const Layout = ({children, ...other}:MyComponentProps) => {
    const [walletAddress, setWalletAddress] = useState();  
    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
        const [account] = await window.ethereum.request(
            { method: 'eth_requestAccounts' });  // connect wallet
            setWalletAddress(account);
        }
    }

    return(
        <>
            <Header connectWallet={connectWallet} walletAddress={walletAddress}/>
            <>
                {Children}
            </> 
        </>
    )
}