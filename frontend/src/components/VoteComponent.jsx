import { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const VoteComponent = () => {
  const { contract } = useWeb3();
  const [candidateID, setCandidateID] = useState('');

  const handleVote = async () => {
    try {
      await contract.methods.vote(candidateID).send({ from: window.ethereum.selectedAddress });
      alert('Vote cast successfully!');
    } catch (error) {
      console.error('Error casting vote:', error);
      alert('Failed to cast vote');
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Cast Your Vote</h2>
      <input
        type="number"
        value={candidateID}
        onChange={(e) => setCandidateID(e.target.value)}
        placeholder="Candidate ID"
        className="border p-2 mr-2"
      />
      <button
        onClick={handleVote}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Vote
      </button>
    </div>
  );
};

export default VoteComponent;
