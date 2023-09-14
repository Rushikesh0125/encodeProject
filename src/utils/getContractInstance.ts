import { ethers } from 'ethers';
import FactoryContractABI from './FactroyABI';

// Replace with your contract ABI and address
const contractABI = FactoryContractABI; // Replace with your contract's ABI
const contractAddress = '0x8F2Cafb392E48a777BA49fB6D18Bc3099cEF8E89'; // Replace with your contract's address

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL); // Replace with your Ethereum RPC URL
const signer = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider); // Replace with your private key
const FactoryInstance = new ethers.Contract(contractAddress, FactoryContractABI, signer);

export default FactoryInstance;
