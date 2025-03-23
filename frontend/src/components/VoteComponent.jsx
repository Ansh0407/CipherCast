import { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const VoteComponent = () => {
  const { contract } = useWeb3();
  const [candidateID, setCandidateID] = useState('');

  const handleVote = async () => {
    if (!candidateID) {
      alert('Please enter a valid Candidate ID');
      return;
    }

    try {
      await contract.methods.vote(candidateID).send({ from: window.ethereum.selectedAddress });
      alert('Vote cast successfully!');
      setCandidateID('');
    } catch (error) {
      console.error('Error casting vote:', error);
      alert('Failed to cast vote');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Cast Your Vote</h2>
        
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Candidate ID</label>
          <input
            type="number"
            value={candidateID}
            onChange={(e) => setCandidateID(e.target.value)}
            placeholder="Enter Candidate ID"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={handleVote}
          className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-all"
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default VoteComponent;
