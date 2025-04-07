import { useEffect, useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import Footer from "../components/Footer";

const VotingStatus = () => {
  const { contract } = useWeb3();
  const [hasVoted, setHasVoted] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  useEffect(() => {
    fetchStatus(); 

    const interval = setInterval(() => {
      fetchStatus();
    }, 10000);

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", fetchStatus);
    }

    return () => {
      clearInterval(interval);
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", fetchStatus);
      }
    };
  }, [contract]);

  return (
    <div className="relative z-10 flex flex-col h-full">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-6 rounded-lg shadow-2xl w-full max-w-md border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Voting Status</h2>
      
      <div className={`p-4 rounded-md ${hasVoted ? 'bg-green-100' : 'bg-red-100'}`}>
        <p className="text-lg font-semibold text-gray-700">🗳 Your Vote Status</p>
        <p className={`font-medium ${hasVoted ? 'text-green-600' : 'text-red-600'}`}>
          {hasVoted ? '✅ You have voted' : '❌ You have not voted'}
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default VotingStatus;
