import { useContext } from "react";
import { contractAddress } from "../config/contractAddress";
import { contractABI } from "../config/contractABI";

const CandidateList = () => {
    const { candidates } = useContext(VotingContext);

    return (
        <div>
            <h2>Candidate List</h2>
            {candidates.map((candidate) => (
                <div key={candidate.id}>
                    <p>ID: {candidate.id}</p>
                    <p>Name: {candidate.name}</p>
                    <p>Party: {candidate.party}</p>
                    <p>Votes: {candidate.voteCount}</p>
                </div>
            ))}
        </div>
    );
};

export default CandidateList;
