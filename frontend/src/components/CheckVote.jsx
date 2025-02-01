import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../config/contractAddress";
import { contractABI } from "../config/contractABI";

const CheckVote = () => {
    const [hasVoted, setHasVoted] = useState(false);

    const checkVote = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const voted = await contract.checkVote();
            setHasVoted(voted);
        } catch (error) {
            console.error("Error checking vote:", error);
        }
    };

    useEffect(() => {
        checkVote();
    }, []);

    return (
        <div>
            <h2>Voting Status</h2>
            <p>{hasVoted ? "You have already voted." : "You have not voted yet."}</p>
        </div>
    );
};

export default CheckVote;
