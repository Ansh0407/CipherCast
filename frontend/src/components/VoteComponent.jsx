import { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const VoteComponent = ({ updateVoteCount }) => {
  const { contract } = useWeb3();
  const [candidateID, setCandidateID] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVote = async () => {
    if (!candidateID || candidateID <= 0 || isNaN(candidateID)) {
      alert('Please enter a valid positive Candidate ID');
      return;
    }

    if (!contract) {
      alert('Web3 contract not initialized. Please refresh the page or check your connection.');
      return;
    }

    if (!window.ethereum || !window.ethereum.selectedAddress) {
      alert('MetaMask is not connected. Please connect your wallet.');
      return;
    }

    try {
      await contract.methods.vote(candidateID).send({ from: window.ethereum.selectedAddress });
      setSuccessMessage('Vote cast successfully!');
      setErrorMessage('');
      
      // Call the updateVoteCount prop to trigger re-render
      updateVoteCount(candidateID);
      
      setCandidateID('');
    } catch (error) {
      console.error('Error casting vote:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to cast vote. Please try again later.');
    }
  };

  return (
    <div className="w-full p-8 mt-20 relative z-10">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-700">Cast Your Vote</h2>
        {successMessage && <p className="text-center text-green-600 mb-6">{successMessage}</p>}
        {errorMessage && <p className="text-center text-red-600 mb-6">{errorMessage}</p>}
        <div className="mb-6">
          <label className="block text-black font-bold mb-4">Candidate ID</label>
          <input
            type="number"
            value={candidateID}
            onChange={(e) => setCandidateID(e.target.value)}
            placeholder="Enter Candidate ID"
            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-300 text-black"
          />
        </div>
        <button
          onClick={handleVote}
          className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-all text-lg"
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default VoteComponent;