// VotingStatus.jsx
import { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const VotingStatus = () => {
  const { contract } = useWeb3();
  const [hasVoted, setHasVoted] = useState(false);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const voted = await contract.methods.checkVote().call({ from: window.ethereum.selectedAddress });
        setHasVoted(voted);
        
        const dates = await contract.methods.getDates().call();
        setStartDate(new Date(dates[0] * 1000).toLocaleString());
        setEndDate(new Date(dates[1] * 1000).toLocaleString());
      } catch (error) {
        console.error('Error fetching voting status:', error);
      }
    };

    fetchStatus();
  }, [contract]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Voting Status</h2>
      <p><strong>Voting Period:</strong> {startDate} - {endDate}</p>
      <p><strong>Your Vote Status:</strong> {hasVoted ? 'You have voted' : 'You have not voted'}</p>
    </div>
  );
};

export default VotingStatus;
