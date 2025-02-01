import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../config/contractAddress";
import { contractABI } from "../config/contractABI";

const AddCandidate = () => {
    const [name, setName] = useState("");
    const [party, setParty] = useState("");

    const addCandidate = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            await contract.addCandidate(name, party);
            alert("Candidate added successfully!");
        } catch (error) {
            console.error("Error adding candidate:", error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Candidate Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Party" onChange={(e) => setParty(e.target.value)} />
            <button onClick={addCandidate}>Add Candidate</button>
        </div>
    );
};

export default AddCandidate;
