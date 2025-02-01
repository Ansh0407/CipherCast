import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../config/contractAddress";
import { contractABI } from "../config/contractABI";

const GetVotingDates = () => {
    const [dates, setDates] = useState({ start: 0, end: 0 });

    const fetchDates = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const result = await contract.getDates();
            setDates({ start: result[0].toNumber(), end: result[1].toNumber() });
        } catch (error) {
            console.error("Error fetching voting dates:", error);
        }
    };

    useEffect(() => {
        fetchDates();
    }, []);

    return (
        <div>
            <h2>Voting Dates</h2>
            <p>Start: {new Date(dates.start * 1000).toLocaleString()}</p>
            <p>End: {new Date(dates.end * 1000).toLocaleString()}</p>
        </div>
    );
};

export default GetVotingDates;
