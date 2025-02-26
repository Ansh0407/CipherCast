import { ethers } from "ethers";
import Voting from "../contracts/Voting.json";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const getContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, Voting.abi, signer);
};

export { getContract };
