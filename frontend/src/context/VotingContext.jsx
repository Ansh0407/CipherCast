import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../config/contractAddress";
import { contractABI } from "../config/contractABI";

export const VotingContext = createContext();

const VotingProvider = ({ children }) => {
    const [candidates, setCandidates] = useState([]);
    const [votingDates, setVotingDates] = useState({ start: 0, end: 0 });
    const [hasVoted, setHasVoted] = useState(false);

    const getEthereumContract = () => {
        if (!window.ethereum) return null;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    };

    const fetchCandidates = async () => {
        try {
            const contract = getEthereumContract();
            if (contract) {
                const count = await contract.getCountCandidates();
                let tempCandidates = [];
                for (let i = 1; i <= count; i++) {
                    const candidate = await contract.getCandidate(i);
                    tempCandidates.push({
                        id: candidate[0].toNumber(),
                        name: candidate[1],
                        party: candidate[2],
                        voteCount: candidate[3].toNumber(),
                    });
                }
                setCandidates(tempCandidates);
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    const checkUserVote = async () => {
        try {
            const contract = getEthereumContract();
            if (contract) {
                const voted = await contract.checkVote();
                setHasVoted(voted);
            }
        } catch (error) {
            console.error("Error checking vote:", error);
        }
    };

    useEffect(() => {
        fetchCandidates();
        checkUserVote();
    }, []);

    return (
        <VotingContext.Provider value={{ candidates, hasVoted, fetchCandidates }}>
            {children}
        </VotingContext.Provider>
    );
};

export default VotingProvider;
