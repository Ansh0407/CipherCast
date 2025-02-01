import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../config/contractAddress";
import { contractABI } from "../config/contractABI";

const SetVotingDates = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const setDates = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            await contract.setDates(parseInt(startDate), parseInt(endDate));
            alert("Voting dates set successfully!");
        } catch (error) {
            console.error("Error setting dates:", error);
        }
    };

    return (
        <div>
            <input type="number" placeholder="Start Timestamp" onChange={(e) => setStartDate(e.target.value)} />
            <input type="number" placeholder="End Timestamp" onChange={(e) => setEndDate(e.target.value)} />
            <button onClick={setDates}>Set Voting Dates</button>
        </div>
    );
};

export default SetVotingDates;
