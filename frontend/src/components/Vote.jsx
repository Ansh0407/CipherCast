import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../config/contractAddress";
import { contractABI } from "../config/contractABI";

const Vote = () => {
    const [candidateID, setCandidateID] = useState("");

    const voteForCandidate = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            await contract.vote(parseInt(candidateID));
            alert("Vote cast successfully!");
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    return (
        <div>
            <input type="number" placeholder="Candidate ID" onChange={(e) => setCandidateID(e.target.value)} />
            <button onClick={voteForCandidate}>Vote</button>
        </div>
    );
};

export default Vote;
